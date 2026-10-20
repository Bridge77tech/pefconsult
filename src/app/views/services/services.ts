import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCard, ServiceCardImageBox } from '../../components/services/service-card/service-card';
import { ReachOutCard } from '../../components/reach-out-card/reach-out-card';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { ServiceContainer } from '../../components/services/service-container/service-container';
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-services',
  imports: [ServiceContainer, ServiceCard, ReachOutCard, RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  _images = inject(ImageService);
  _route = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // Card titles: *asterisks* mark the muted words; titleWidth / mobileTitleWidth are the Figma
  // desktop and mobile text-box widths (they set each title's line breaks).
  // Image boxes are the Figma illustration positions in card coordinates (clipped by the card).
  riskImageBox: ServiceCardImageBox = { left: 272.09, top: 11.5, width: 110.82, height: 150 };
  corporateImageBox: ServiceCardImageBox = { left: 277.89, top: 41.5, width: 100.11, height: 126.5 };
  strategyImageBox: ServiceCardImageBox = { left: 236, top: 47, width: 142, height: 121 };
  infoImageBox: ServiceCardImageBox = { left: 247, top: 52, width: 131, height: 116 };

  // Same illustrations on the 358x155 mobile cards (Figma mobile frame, scaled 0.923)
  riskMobileImageBox: ServiceCardImageBox = { left: 251.7, top: 10.6, width: 102.5, height: 138.8 };
  corporateMobileImageBox: ServiceCardImageBox = { left: 261.4, top: 38.3, width: 92.4, height: 116.7 };
  strategyMobileImageBox: ServiceCardImageBox = { left: 222.6, top: 43.4, width: 131.1, height: 111.7 };
  infoMobileImageBox: ServiceCardImageBox = { left: 227.9, top: 48, width: 120.9, height: 107.1 };

  riskManagement = [
    {
      label: 'Enterprise Risk *Management*',
      titleWidth: 238,
      iconUrl: this._images.riskImage,
      mobileTitleWidth: 220,
      path: '/enterprise-risk-management',
    },
    {
      label: 'Operational *Risk* Management Framework',
      titleWidth: 271,
      iconUrl: this._images.riskImage,
      mobileTitleWidth: 250,
      path: '/operational-risk-management',
    },
    {
      label: '*Credit* Risk Management',
      // Figma box is 265px; Chrome sets Satoshi slightly narrower, so this keeps Figma's line break
      titleWidth: 250,
      iconUrl: this._images.riskImage,
      // Figma mobile box is 196px; narrower here so Chrome breaks after "Risk" like Figma
      mobileTitleWidth: 175,
      path: '/credit-risk-management',
    },
    {
      label: '*Fraud* Risk Management',
      titleWidth: 238,
      iconUrl: this._images.riskImage,
      mobileTitleWidth: 220,
      path: '/fraud-risk-management',
    },
    {
      label: 'Business Continuity *Management*',
      titleWidth: 238,
      iconUrl: this._images.riskImage,
      mobileTitleWidth: 220,
      path: '/business-continuity-management',
    },
  ];

  corporateGovernances = [
    {
      label: 'Board *Evaluation*',
      titleWidth: 238,
      iconUrl: this._images.coporateGovernance,
      mobileTitleWidth: 220,
      path: '/board-evaluation',
    },
    {
      label: '*Governance*, Risk & Compliance',
      titleWidth: 238,
      iconUrl: this._images.coporateGovernance,
      mobileTitleWidth: 220,
      path: '/governance-risk-compliance',
    },
    {
      label: 'Corporate Governance & *Role of Directors*',
      titleWidth: 259,
      iconUrl: this._images.coporateGovernance,
      mobileTitleWidth: 239,
      path: '/corporate-governance-role-of-directors',
    },
    {
      label: 'Corporate *Governance* & Training (Bank Directors)',
      titleWidth: 276,
      iconUrl: this._images.coporateGovernance,
      path: '/coporate-governance-training-bank-directors',
    },
    {
      label: 'Risk Culture, *Governance* & *Balanced* Incentives',
      titleWidth: 280,
      iconUrl: this._images.coporateGovernance,
      mobileTitleWidth: 258,
      path: '/risk-culture-governance-balanced-incentives',
    },
    {
      label: '*Environment*, Social and Governance *Framework*',
      titleWidth: 307,
      iconUrl: this._images.coporateGovernance,
      mobileTitleWidth: 283,
      path: '/environment-social-governance-framework',
    },
    {
      label: 'Combined Assurance *Framework*',
      titleWidth: 276,
      iconUrl: this._images.coporateGovernance,
      mobileTitleWidth: 255,
      path: '/combined-assurance-framework',
    },
  ];

  strategyOrgs = [
    {
      label: '*Exploring* Strategy',
      titleWidth: 257,
      iconUrl: this._images.strategy,
      mobileTitleWidth: 237,
      path: '/exploring-strategy',
    },
    {
      label: 'Competitive & *Growth* Strategies',
      titleWidth: 257,
      iconUrl: this._images.strategy,
      mobileTitleWidth: 237,
      path: '/competitive-growth-strategies',
    },
    {
      label: '*Sustainable* Financing',
      titleWidth: 257,
      iconUrl: this._images.strategy,
      mobileTitleWidth: 237,
      path: '/sustainable-financing',
    },
    {
      label: 'Strategy *Formulation* & Implementation',
      titleWidth: 257,
      iconUrl: this._images.strategy,
      mobileTitleWidth: 237,
      path: '/strategy-formulation-implementation',
    },
    {
      label: 'Framework for Monitoring & *Evaluation*',
      titleWidth: 288,
      iconUrl: this._images.strategy,
      mobileTitleWidth: 224,
      path: '/framework-monitoring-evaluation',
    },
  ];

  informations = [
    {
      label: 'Risk *Management* Frameworks for Information *Systems*',
      titleWidth: 331,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 252,
      path: '/risk-management-frameworks-information-systems',
    },
    {
      label: '*Information* Systems *Risk* Management',
      titleWidth: 331,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 205,
      path: '/information-systems-risk-management',
    },
    {
      label: 'Information Technology *Governance*',
      titleWidth: 331,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 205,
      path: '/information-technology-governance',
    },
    {
      label: 'Information *Technology* General *Controls*',
      titleWidth: 331,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 205,
      path: '/information-technology-general-controls',
    },
    {
      label: 'Auditing *Information* *Technology* Projects',
      titleWidth: 331,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 205,
      path: '/auditing-information-technology-projects',
    },
    {
      label: '*Auditing* Information Technology',
      titleWidth: 331,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 205,
      path: '/auditing-information-technology',
    },
    {
      label: 'Internal *Audit* Process',
      // Figma box is 233px; Chrome sets Satoshi slightly narrower, so this keeps Figma's line break
      titleWidth: 220,
      iconUrl: this._images.infoRing,
      mobileTitleWidth: 144,
      path: '/internal-audit-process',
    },
  ];

  scrollToFooter() {
    if (!isPlatformBrowser(this.platformId)) return;
    document.querySelector('app-footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onButtonClick(path: string) {
    this._route.navigate([path]);
  }
}
