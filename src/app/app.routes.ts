import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { guestGuard } from './services/guest.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register').then(m => m.RegisterComponent),
    canActivate: [guestGuard] // Solo usuarios NO autenticados
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login').then(m => m.LoginComponent),
    canActivate: [guestGuard] // Solo usuarios NO autenticados
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile').then(m => m.ProfileComponent),
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
