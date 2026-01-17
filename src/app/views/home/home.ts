import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomButton } from "../../components/buttons/custom-button/custom-button";
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-home',
  imports: [CustomButton, UpperCasePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnInit, OnDestroy {
  _images = inject(ImageService);
  platformId = inject(PLATFORM_ID)
  private zone = inject(NgZone);

  homeContent: string = "PEF Consults offers risk management training and consultancy for business. We are continually shaping the future of business, side by side with you. We equip leaders and organizations with the knowledge and systems needed to turn risk into opportunity. Our expertise ensures your strategies remain sound, secure, and sustainable."
  ourReachContent: string = "Business do not stand still, and neither do we! At PEF Consults, we design solutions that move with you; anticipating every market shift, integrating innovation and crafting implementation. Our world wide experience helps us anticipate and act. In the midst of constant change, your organization thrives."

  @ViewChild('titleRef') titleRef!: ElementRef;
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChildren('countBox', { read: ElementRef }) countBoxes!: QueryList<ElementRef>;

  animatedCounts: number[] = [];
  hasAnimated: boolean[] = [];
  private observer?: IntersectionObserver;
  private countBoxesSub?: Subscription;
  private animatedEls = new WeakSet<HTMLElement>();


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try { document.body.classList.add('show-move'); } catch {}
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.countBoxes) return;
  
    // Title animation
    const titleEl = this.titleRef?.nativeElement;
    if (titleEl) {
      const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && titleEl.classList.add('visible'));
      });
      titleObserver.observe(titleEl);
    }
  
    // Content animation
    const contentEl = this.contentRef?.nativeElement;
    if (contentEl) {
      const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && contentEl.classList.add('visible-right'));
      });
      contentObserver.observe(contentEl);
    }
  
    /** -------------------------------
     *  COUNT ANIMATION FIX
     *  -------------------------------- */
  
    // initialize counts
    this.animatedCounts = this.ourFootPrint.map(() => 0);
    this.hasAnimated = this.ourFootPrint.map(() => false);

    // delay ensures @for has rendered
    setTimeout(() => this.initCounterObserver(), 50);

    // run once after view init (short delay to let bindings populate)
    setTimeout(() => this.setupCountObserver(), 50);

    // watch for dynamic changes (e.g., after async data arrives)
    this.countBoxesSub = this.countBoxes.changes.subscribe(() => {
      // small delay to let DOM update
      setTimeout(() => this.setupCountObserver(), 50);
    });
  }
  
  ngOnDestroy(): void {
    // cleanup observers
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.countBoxesSub) this.countBoxesSub.unsubscribe();

    // remove helper class when leaving Home
    if (isPlatformBrowser(this.platformId)) {
      try { document.body.classList.remove('show-move'); } catch {}
    }
  }

  private easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  private animateNumber(el: HTMLElement, target: number, duration = 1200) {
    if (this.animatedEls.has(el)) return; // already animated
    this.animatedEls.add(el);

    const start = performance.now();
    const startVal = 0;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = this.easeOut(progress);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = `${current} +`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  private initCounterObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = this.countBoxes
            .toArray()
            .findIndex(el => el.nativeElement === entry.target);

          if (index !== -1 && !this.hasAnimated[index]) {
            this.hasAnimated[index] = true;

            // 👇 RUN INSIDE ANGULAR
            this.zone.run(() => this.startCounting(index));
          }
        });
      },
      { threshold: 0.3 }
    );

    this.countBoxes.forEach(box => observer.observe(box.nativeElement));
  }
  
  startCounting(index: number) {
    const target = this.ourFootPrint[index].count;
    const step = Math.max(1, Math.ceil(target / 50));

    const interval = setInterval(() => {
      if (this.animatedCounts[index] < target) {
        this.animatedCounts[index] += step;
      } else {
        this.animatedCounts[index] = target;
        clearInterval(interval);
      }
    }, 30);
  }

  private setupCountObserver() {
    // cleanup existing observer to avoid duplicates
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    const boxes = this.countBoxes ? this.countBoxes.toArray() : [];
    if (!boxes.length) return;

    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const box = entry.target as HTMLElement;
        const p = box.querySelector('p') as HTMLElement | null;
        if (!p) {
          obs.unobserve(box);
          return;
        }
        const raw = p.getAttribute('data-target') || p.textContent || '0';
        const target = parseInt(String(raw).replace(/\D/g, ''), 10) || 0;
        this.animateNumber(p, target);
        obs.unobserve(box);
      });
    }, { threshold: 0.4 });

    boxes.forEach(q => {
      const el = q.nativeElement as HTMLElement;
      const p = el.querySelector('p') as HTMLElement | null;
      if (p) p.textContent = '0 +';
      this.observer!.observe(el);
    });
  }
  
  clients = [
    {
      name: 'Vin Consult',
      imageUrl: this._images.viuConsult,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
    },
    {
      name: 'Absa',
      imageUrl: this._images.absa,
    },
    {
      name: 'Total Energies',
      imageUrl: this._images.totalEnergies,
    },
    {
      name: 'Modec',
      imageUrl: this._images.cmnLogo,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
    }
  ];

  ourFootPrint = [
    {
      count: 30,
      label: "Countries",
    },
    {
      count: 100,
      label: "Customers",
    },
    {
      count: 50,
      label: "Years",
    },
    {
      count: 12,
      label: "Industries Served",
    },
  ]
  

  scrollToTheFooter() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const debug = (...args: any[]) => {
      try { console.debug('[scrollToTheFooter]', ...args); } catch {}
    };

    const scrollToElement = (el: Element) => {
      const elRect = (el as HTMLElement).getBoundingClientRect();
      debug('footer rect', elRect);

      // try document.scrollingElement first
      const scrollingEl = (document.scrollingElement as HTMLElement) || document.documentElement || document.body;
      if (scrollingEl) {
        const top = scrollingEl.scrollTop + elRect.top;
        debug('using scrollingElement, top', top);
        try {
          scrollingEl.scrollTo({ top: Math.max(0, Math.floor(top) - 12), behavior: 'smooth' });
          return;
        } catch (e) {
          debug('scrollingElement scroll failed', e);
        }
      }

      // fallback to window
      try {
        const top = window.scrollY + elRect.top;
        debug('using window, top', top);
        window.scrollTo({ top: Math.max(0, Math.floor(top) - 12), behavior: 'smooth' });
        return;
      } catch (e) {
        debug('window scroll failed', e);
      }

      // last resort: element.scrollIntoView
      try {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e) {
        debug('scrollIntoView failed', e);
      }
    };

    const tryFind = (tries = 0) => {
      const footerEl = document.querySelector('app-footer');
      debug('tryFind attempt', tries, 'found', !!footerEl);
      if (footerEl) {
        scrollToElement(footerEl);
        return;
      }
      if (tries < 15) {
        setTimeout(() => tryFind(tries + 1), 80);
      } else {
        debug('footer not found after retries');
      }
    };

    tryFind();
  }
}
