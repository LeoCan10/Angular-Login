import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si NO está autenticado, puede acceder (guest)
  if (!auth.isAuthenticated()) {
    return true;
  } else {
    // Si está autenticado, redirigir al perfil
    router.navigate(['/profile']);
    return false;
  }
};
