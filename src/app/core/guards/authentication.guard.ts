import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageTokenService } from '../services/storage/local-storage-token.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let authenticationService = inject(LocalStorageTokenService);
  const router: Router = inject(Router);

  /*if (authenticationService.validToken()) {
    return true;
  }*/
  return router.createUrlTree(['/login']);
};
