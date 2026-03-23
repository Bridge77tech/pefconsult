import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Services } from './services/services';
import { RiskManagementView } from './risk-management/risk-management-view';

export const viewsRoutes: Routes = [
  // Home
  {
    path: 'home',
    component: Home,
    data: { title: 'home' },
  },

  // redirect to home page
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'services',
    component: Services,
    data: { title: 'services' },
  },

  {
    path: 'about',
    component: About,
    data: { title: 'about' },
  },

  // ===== Risk Management Views (Dynamic) =====
  {
    path: 'enterprise-risk-management',
    component: RiskManagementView,
    data: { title: 'Enterprise Risk Management', contentId: 'enterprise-risk-management' },
  },
  {
    path: 'operational-risk-management',
    component: RiskManagementView,
    data: { title: 'Operational Risk Management', contentId: 'operational-risk-management' },
  },
  {
    path: 'credit-risk-management',
    component: RiskManagementView,
    data: { title: 'Credit Risk Management', contentId: 'credit-risk-management' },
  },
  {
    path: 'fraud-risk-management',
    component: RiskManagementView,
    data: { title: 'Fraud Risk Management', contentId: 'fraud-risk-management' },
  },
  {
    path: 'business-continuity-management',
    component: RiskManagementView,
    data: { title: 'Business Continuity Management', contentId: 'business-continuity-management' },
  },
];
