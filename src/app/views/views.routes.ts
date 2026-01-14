import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { About } from "./about/about";
import { Services } from "./services/services";

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
    }
];