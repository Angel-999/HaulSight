import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.routes').then(m => m.CONTACT_ROUTES) },
    { path: 'search', loadChildren: () => import('./pages/search/search.routes').then(m => m.SEARCH_ROUTES) }
];
