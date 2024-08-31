import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { UserAgreementService } from '../services/client/user-agreement.service';

export function userAgreementGuard(): CanActivateFn {
  return () => {
    const userAgreementService = inject(UserAgreementService);
    userAgreementService.validateUserAgreement();
    return true;
  }
};
