import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { About } from "./about/about";
import { Services } from "./services/services";
import { Course } from "./course/course";

export const viewsRoutes: Routes = [
    // Home
    {
        path: 'home',
        component: Home,
        data: {title: 'home'}
    },

    // redirect to home page
    {
        path: '',
        redirectTo: 'home',
        pathMatch: "full",
    },

    {
        path: 'services',
        component: Services,
        data: {title: 'services'}
    },

    {
        path: 'about',
        component: About,
        data: {title: 'about'}
    },

    {
        path: 'enterprise-risk-management',
        component: Course,
        data: {title: 'Enterprise Risk Management', courseId: 'enterprise-risk-management'}
    },

    {
        path: 'credit-risk-management',
        component: Course,
        data: {title: 'Credit Risk Management', courseId: 'credit-risk-management'}
    },

    {
        path: 'fraud-risk-management',
        component: Course,
        data: {title: 'Fraud Risk Management', courseId: 'fraud-risk-management'}
    },

    {
        path: 'operational-risk-management',
        component: Course,
        data: {title: 'Operational Risk Management Framework', courseId: 'operational-risk-management'}
    },

    {
        path: 'business-continuity-management',
        component: Course,
        data: {title: 'Business Continuity Management', courseId: 'business-continuity-management'}
    },

];
