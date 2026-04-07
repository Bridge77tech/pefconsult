import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCard } from '../../components/services/service-card/service-card';
import { ServiceContainer } from '../../components/services/service-container/service-container';
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-services',
  imports: [ServiceContainer, ServiceCard],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements AfterViewInit, OnDestroy {
  _images = inject(ImageService);
  _route = inject(Router);
  platformId = inject(PLATFORM_ID);

  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('serviceIntro') serviceIntro!: ElementRef;
  @ViewChild('makeMoveRef') makeMoveRef!: ElementRef;
  @ViewChildren('svcItem') svcItems!: QueryList<ElementRef>;

  private observers: IntersectionObserver[] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Hero title & subtitle — CSS keyframe animations handle these on load
    this.heroTitle?.nativeElement.classList.add('hero-animate');
    this.heroSubtitle?.nativeElement.classList.add('hero-animate-sub');

    const inViewOpts: IntersectionObserverInit = { threshold: 0.3 };

    // Intro block
    this.observeOnce(this.serviceIntro, 'fade-up', inViewOpts);

    // Each service item observed individually with staggered delay via CSS
    this.svcItems?.forEach((item, i) => {
      const node = item.nativeElement as HTMLElement;
      node.style.transitionDelay = `${i * 0.2}s`;
      this.observeOnce(item, 'fade-up', inViewOpts);
    });

    // Make the move
    this.observeOnce(this.makeMoveRef, 'fade-up', inViewOpts);
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

  riskManagement = [
    {
      label: 'Enterprise Risk Management',
      iconUrl: this._images.riskImage,
      path: '/enterprise-risk-management',
    },
    {
      label: 'Operational Risk Management Framework',
      iconUrl: this._images.riskImage,
      path: '/operational-risk-management',
    },
    {
      label: 'Credit Risk Management',
      iconUrl: this._images.riskImage,
      path: '/credit-risk-management',
    },
    {
      label: 'Fraud Risk Management',
      iconUrl: this._images.riskImage,
      path: '/fraud-risk-management',
    },
    {
      label: 'Business Continuity Management',
      iconUrl: this._images.riskImage,
      path: '/business-continuity-management',
    },
  ];

  corporateGovernances = [
    {
      label: 'Board Evaluation',
      iconUrl: this._images.coporateGovernance,
      path: '/board-evaluation',
    },
    {
      label: 'Governance, Risk & Compliance',
      iconUrl: this._images.coporateGovernance,
      path: '/governance-risk-compliance',
    },
    {
      label: 'Corporate Governance & Role of Directors',
      iconUrl: this._images.coporateGovernance,
      path: '/corporate-governance-role-of-directors',
    },
    {
      label: 'Corporate Governance & Training (Bank Directors)',
      iconUrl: this._images.coporateGovernance,
      path: '/coporate-governance-training-bank-directors',
    },
    {
      label: 'Risk Culture, Governance & Balanced Incentives',
      iconUrl: this._images.coporateGovernance,
      path: '/risk-culture-governance-balanced-incentives',
    },
    {
      label: 'Environment, Social and Governance Framework',
      iconUrl: this._images.coporateGovernance,
      path: '/environment-social-governance-framework',
    },
    {
      label: 'Combined Assurance Framework',
      iconUrl: this._images.coporateGovernance,
      path: '/combined-assurance-framework',
    },
  ];

  strategyOrgs = [
    {
      label: 'Exploring Strategy',
      iconUrl: this._images.strategy,
      path: '/exploring-strategy',
    },
    {
      label: 'Competitive & Growth Strategies',
      iconUrl: this._images.strategy,
      path: '/competitive-growth-strategies',
    },
    {
      label: 'Sustainable Financing',
      iconUrl: this._images.strategy,
      path: '/sustainable-financing',
    },
    {
      label: 'Strategy Formulation & Implementation',
      iconUrl: this._images.strategy,
      path: '/strategy-formulation-implementation',
    },
    {
      label: 'Framework for Monitoring & Evaluation',
      iconUrl: this._images.strategy,
      path: '/framework-monitoring-evaluation',
    },
  ];

  informations = [
    {
      label: 'Risk Management Frameworks for Information Systems',
      iconUrl: this._images.infoRing,
      path: '/risk-management-frameworks-information-systems',
    },
    {
      label: 'Information Systems Risk Management',
      iconUrl: this._images.infoRing,
      path: '/information-systems-risk-management',
    },
    {
      label: 'Information Technology Governance',
      iconUrl: this._images.infoRing,
      path: '/information-technology-governance',
    },
    {
      label: 'Information Technology General Controls',
      iconUrl: this._images.infoRing,
      path: '/information-technology-general-controls',
    },
    {
      label: 'Auditing Information Technology Projects',
      iconUrl: this._images.infoRing,
      path: '/auditing-information-technology-projects',
    },
    {
      label: 'Auditing Information Technology',
      iconUrl: this._images.infoRing,
      path: '/auditing-information-technology',
    },
    {
      label: 'Internal Audit Process',
      iconUrl: this._images.infoRing,
      path: '/internal-audit-process',
    },
  ];

  onButtonClick(path: string) {
    this._route.navigate([path]);
  }
}
