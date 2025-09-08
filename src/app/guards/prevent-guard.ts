import { CanActivateFn } from '@angular/router';

export const preventGuard: CanActivateFn = (route, state) => {
  return true;
};
