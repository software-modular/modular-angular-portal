import { Injectable } from '@angular/core';
import { Authenticator } from '../contracts/Authenticator';
import { environment } from '../../../../environments/environment';
import { AuthenticatorFactory } from '../factory/AuthenticatorFactory';
import { TypeAuthenticatorUtils } from '../../utils/TypeAuthenticatorUtils';
import { TypeAuthenticator } from '../../domain/enum/TypeAuthenticator';
import { LocalStorageTokenService } from '../storage/local-storage-token.service';
import { UserAuthenticateData } from '../../domain/entity/UserAuthenticate';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authenticator: Authenticator;

  constructor(private localStorageTokenService: LocalStorageTokenService) {
    let authenticatorFactory = new AuthenticatorFactory();
    let typeAuthenticator: TypeAuthenticator = TypeAuthenticatorUtils
      .getAutheticatorTypeByName(environment.configuration.typeAuthenticator);
    this.authenticator = authenticatorFactory.getAutenticator(typeAuthenticator);
  }

  authenticateUser() {
    debugger
    let properties: Map<string, any> = new Map<string, any>();
    properties.set("IDENTIFICATION", "312828031");
    let userData: UserAuthenticateData = {
      username: "",
      password: "Luchoesgay",
      properties: properties
    }
    this.authenticator.authenticate(userData);
  }

  getAuthenticationToken(): string {
    return this.localStorageTokenService.getToken();
  }


  getAuthenticator(): Authenticator {
    return this.authenticator;
  }
}
