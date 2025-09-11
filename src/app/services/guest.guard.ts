import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = localStorage.getItem('currentUser');
  if (user) {
    // si ya hay sesión → redirige al perfil
    router.navigate(['/profile']);
    return false;
  }
  return true;
};
