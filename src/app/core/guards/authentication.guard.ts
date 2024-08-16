import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageTokenService } from '../services/storage/local-storage-token.service';
import { environment } from '../../../environments/environment';

export function authenticationGuard(): CanActivateFn {
  return () => {
    let authenticationService = inject(LocalStorageTokenService);
    const router: Router = inject(Router);
    return authenticationService.validToken() || router.createUrlTree([environment.configuration.defaultUrlRedirect]);;
  };
};
