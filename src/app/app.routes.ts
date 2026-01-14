import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { ErrorPage } from './components/error-page/error-page';

export const routes: Routes = [

    // Redirect to home
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    // Main layout
    {
        path: '',
        component: MainLayout,
        loadChildren: () => import('./views/views.routes').then(m => m.viewsRoutes),
        data: {title: ''}
    },

    // Error layout
    {
        path: '**',
        component: ErrorPage,
        data: {title: 'Error'}
    },


];
