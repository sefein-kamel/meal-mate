import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const preventGuardeGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    router.navigate([`/home`])
    return false;
  } else{
    return true;
  }
};