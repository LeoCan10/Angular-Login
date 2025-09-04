import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login').then(m => m.LoginComponent),
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
