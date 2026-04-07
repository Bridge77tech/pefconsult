import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild('globeRef') globeRef!: ElementRef;
  @ViewChild('whoWeAreLeft') whoWeAreLeft!: ElementRef;
  @ViewChild('whoWeAreMiddle') whoWeAreMiddle!: ElementRef;
  @ViewChild('whoWeAreRight') whoWeAreRight!: ElementRef;
  @ViewChild('servicesLeft') servicesLeft!: ElementRef;
  @ViewChild('servicesMiddle') servicesMiddle!: ElementRef;
  @ViewChild('servicesRight') servicesRight!: ElementRef;
  @ViewChildren('countBox', { read: ElementRef }) countBoxes!: QueryList<ElementRef>;

  animatedCounts: number[] = [];
  hasAnimated: boolean[] = [];
  private observer?: IntersectionObserver;


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
  
    // Shared observer options — fires only when element is well inside the viewport
    const inViewOpts: IntersectionObserverInit = { threshold: 0.4, rootMargin: '0px 0px -120px 0px' };

    // Title animation
    const titleEl = this.titleRef?.nativeElement;
    if (titleEl) {
      const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && titleEl.classList.add('visible'));
      }, inViewOpts);
      titleObserver.observe(titleEl);
    }

    // Content animation
    const contentEl = this.contentRef?.nativeElement;
    if (contentEl) {
      const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && contentEl.classList.add('visible-right'));
      }, inViewOpts);
      contentObserver.observe(contentEl);
    }

    // Globe bubble animation
    const globeEl = this.globeRef?.nativeElement;
    if (globeEl) {
      const globeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            globeEl.classList.add('bubble-in');
            obs.unobserve(globeEl);
          }
        });
      }, inViewOpts);
      globeObserver.observe(globeEl);
    }

    // Who We Are — panel animations
    const whoWeArePanels: { el: ElementRef | undefined; cls: string }[] = [
      { el: this.whoWeAreLeft,   cls: 'slide-from-left'  },
      { el: this.whoWeAreMiddle, cls: 'slide-from-top'   },
      { el: this.whoWeAreRight,  cls: 'slide-from-right' },
    ];
    whoWeArePanels.forEach(({ el, cls }) => {
      const node = el?.nativeElement;
      if (!node) return;
      const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.classList.add(cls);
            o.unobserve(node);
          }
        });
      }, inViewOpts);
      obs.observe(node);
    });

    // Our Services — panel animations
    const servicesPanels: { el: ElementRef | undefined; cls: string }[] = [
      { el: this.servicesLeft,   cls: 'slide-from-left'  },
      { el: this.servicesMiddle, cls: 'slide-from-top'   },
      { el: this.servicesRight,  cls: 'slide-from-right' },
    ];
    servicesPanels.forEach(({ el, cls }) => {
      const node = el?.nativeElement;
      if (!node) return;
      const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.classList.add(cls);
            o.unobserve(node);
          }
        });
      }, inViewOpts);
      obs.observe(node);
    });
  
    /** -------------------------------
     *  COUNT ANIMATION FIX
     *  -------------------------------- */
  
    // initialize counts
    this.animatedCounts = this.ourFootPrint.map(() => 0);
    this.hasAnimated = this.ourFootPrint.map(() => false);

    // delay ensures @for has rendered
    setTimeout(() => this.initCounterObserver(), 50);
  }
  
  ngOnDestroy(): void {
    // cleanup observers
    if (this.observer) {
      this.observer.disconnect();
    }
    // remove helper class when leaving Home
    if (isPlatformBrowser(this.platformId)) {
      try { document.body.classList.remove('show-move'); } catch {}
    }
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
      { threshold: 0.4, rootMargin: '0px 0px -120px 0px' }
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
