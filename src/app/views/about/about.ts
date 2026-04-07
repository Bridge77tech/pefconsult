import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ImageService } from '../../services/general/image-service';
import { TextContent } from '../../components/about/text-content/text-content';

@Component({
  selector: 'app-about',
  imports: [TextContent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  _images = inject(ImageService);
  platformId = inject(PLATFORM_ID);

  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('companyLeft') companyLeft!: ElementRef;
  @ViewChild('companyRight') companyRight!: ElementRef;
  @ViewChild('missionCard') missionCard!: ElementRef;
  @ViewChild('msgImage') msgImage!: ElementRef;
  @ViewChild('msgContent') msgContent!: ElementRef;
  @ViewChildren('gridItem') gridItems!: QueryList<ElementRef>;

  private observers: IntersectionObserver[] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Hero — page load keyframe animations
    this.heroTitle?.nativeElement.classList.add('hero-animate');
    this.heroSubtitle?.nativeElement.classList.add('hero-animate-sub');

    const opts: IntersectionObserverInit = { threshold: 0.3 };

    // Our Company
    this.observeOnce(this.companyLeft,  'slide-from-left',  opts);
    this.observeOnce(this.companyRight, 'slide-from-right', opts);

    // Mission card — bubble in
    this.observeOnce(this.missionCard, 'bubble-in', opts);

    // Grid value cards — staggered fade up
    this.gridItems?.forEach((item, i) => {
      const node = item.nativeElement as HTMLElement;
      node.style.transitionDelay = `${i * 0.2}s`;
      this.observeOnce(item, 'fade-up', opts);
    });

    // Message section
    this.observeOnce(this.msgImage,   'slide-from-left',  opts);
    this.observeOnce(this.msgContent, 'slide-from-right', opts);
  }

  private observeOnce(ref: ElementRef | undefined, cls: string, opts: IntersectionObserverInit) {
    const node = ref?.nativeElement;
    if (!node) return;
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add(cls);
          o.unobserve(node);
        }
      });
    }, opts);
    obs.observe(node);
    this.observers.push(obs);
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }
}
