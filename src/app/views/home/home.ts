import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { ReachOutCard } from "../../components/reach-out-card/reach-out-card";
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-home',
  imports: [ReachOutCard, UpperCasePipe, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnInit, OnDestroy {
  _images = inject(ImageService);
  platformId = inject(PLATFORM_ID)

  homeContent: string = "PEF Consults offers risk management training and consultancy for business. We are continually shaping the future of business, side by side with you. We equip leaders and organizations with the knowledge and systems needed to turn risk into opportunity. Our expertise ensures your strategies remain sound, secure, and sustainable."
  ourReachContent: string = "Business do not stand still, and neither do we! At PEF Consults, we design solutions that move with you; anticipating every market shift, integrating innovation and crafting implementation. Our world wide experience helps us anticipate and act. In the midst of constant change, your organization thrives."

  @ViewChildren('countBox', { read: ElementRef }) countBoxes!: QueryList<ElementRef>;
  @ViewChild('globe') globeRef?: ElementRef<HTMLElement>;

  // Figma hero label cycle (Enterprise Risk Management component, 149:16314)
  readonly heroLabels = [
    'Enterprise Risk Management',
    'Governance, Compliance & Audit',
    'IT & Control Framework',
    'Financial & Market Risk',
  ];
  heroLabelIndex = 0;

  // signal so timer-driven updates render (the app runs zoneless)
  animatedCounts = signal<number[]>([]);
  private counterObserver?: IntersectionObserver;
  private counterTimers: ReturnType<typeof setInterval>[] = [];

  ngOnInit(): void {
    this.animatedCounts.set(this.ourFootPrint.map(() => 0));
    if (isPlatformBrowser(this.platformId)) {
      try { document.body.classList.add('show-move'); } catch {}
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.initCounterObserver();
    this.loadAnimatedGlobe();
  }

  /**
   * Swaps the static globe for its SVG, whose nodes and connectors light up in sequence
   * (see src/styles/_globe.scss). The PNG stays if the SVG cannot be loaded.
   */
  private async loadAnimatedGlobe() {
    const host = this.globeRef?.nativeElement;
    const sweep = host?.querySelector('.globe-sweep');
    if (!host || !sweep) return;
    try {
      const response = await fetch('images/globe-network.svg');
      if (!response.ok) return;
      sweep.insertAdjacentHTML('beforeend', await response.text()); // trusted, same-origin asset
      host.classList.add('has-svg');
    } catch {
      // keep the static PNG
    }
  }

  ngOnDestroy(): void {
    this.counterObserver?.disconnect();
    this.counterTimers.forEach(clearInterval);
    // remove helper class when leaving Home
    if (isPlatformBrowser(this.platformId)) {
      try { document.body.classList.remove('show-move'); } catch {}
    }
  }

  /** Advances the label while it is fully masked (end of each 3.2s wipe cycle). */
  nextHeroLabel() {
    this.heroLabelIndex = (this.heroLabelIndex + 1) % this.heroLabels.length;
  }

  /** Figma "Social Proof Numbers": counts start when the section scrolls into view. */
  private initCounterObserver() {
    const row = this.countBoxes?.first?.nativeElement?.parentElement as HTMLElement | undefined;
    if (!row) return;

    this.counterObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        this.counterObserver?.disconnect();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.ourFootPrint.forEach((_, i) => this.startCounting(i, reduced));
      },
      { threshold: 0.15 },
    );
    this.counterObserver.observe(row);
  }

  /** Counts up by one every `stepMs` (Figma: 80ms for 30, 25ms for 100, 40ms for 50, 200ms for 12). */
  startCounting(index: number, skipAnimation = false) {
    const { count: target, stepMs } = this.ourFootPrint[index];
    const setCount = (value: number) =>
      this.animatedCounts.update((counts) => counts.map((c, i) => (i === index ? value : c)));
    if (skipAnimation) {
      setCount(target);
      return;
    }
    let value = 0;
    const timer = setInterval(() => {
      setCount(++value);
      if (value >= target) clearInterval(timer);
    }, stepMs);
    this.counterTimers.push(timer);
  }

  // widths are the Figma layer widths (Viu Consult is a 160px text box in Figma)
  clients = [
    {
      name: 'Vin Consult',
      imageUrl: this._images.viuConsult,
      width: 160,
      // Figma renders this as live text; the outlined SVG lacks the 4px left side-bearing
      inset: 4,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
      width: 81.466,
    },
    {
      name: 'Absa',
      imageUrl: this._images.absa,
      width: 40,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
      width: 81.466,
    },
    {
      name: 'Total Energies',
      imageUrl: this._images.totalEnergies,
      width: 54.757,
    },
    {
      name: 'Modec',
      imageUrl: this._images.cmnLogo,
      width: 167.442,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
      width: 81.466,
    },
    {
      name: 'Ecobank',
      imageUrl: this._images.ecobank,
      width: 81.466,
    }
  ];

  ourFootPrint = [
    {
      count: 30,
      stepMs: 80,
      label: "Countries",
    },
    {
      count: 100,
      stepMs: 25,
      label: "Customers",
    },
    {
      count: 50,
      stepMs: 40,
      label: "Years",
    },
    {
      count: 12,
      stepMs: 200,
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
