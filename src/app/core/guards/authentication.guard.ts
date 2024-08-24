import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageTokenService } from '../services/storage/local-storage-token.service';

export function authenticationGuard(): CanActivateFn {
  return () => {
    let authenticationService = inject(LocalStorageTokenService);
    const router: Router = inject(Router);
    return authenticationService.validToken() || router.createUrlTree([environment.configuration.defaultUrlRedirect]);;
  };
};
