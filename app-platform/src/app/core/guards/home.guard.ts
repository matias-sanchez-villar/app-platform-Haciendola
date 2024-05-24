import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service'; 

export const homeGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.getToken()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
