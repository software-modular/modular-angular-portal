import { TestBed } from '@angular/core/testing';

import { AuthenticatorDefaultService } from './authenticator-default.service';

describe('AuthenticatorDefaultService', () => {
  let service: AuthenticatorDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatorDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
