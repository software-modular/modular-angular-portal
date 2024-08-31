import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userAgreementGuard } from './user-agreement.guard';

describe('userAgreementGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userAgreementGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
