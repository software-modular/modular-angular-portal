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

  authenticateUser(identification: string, password: string) {
    let urlLogin: string = `${environment.api.host}${environment.api.endpoints.users.login}`;
    this.authenticator.authenticate(this.getUserAuthenticateData(identification, password), urlLogin);
  }

  getAuthenticationToken(): string {
    return this.localStorageTokenService.getToken();
  }


  getAuthenticator(): Authenticator {
    return this.authenticator;
  }

  private getUserAuthenticateData(identification: string, password: string): UserAuthenticateData {
    return {
      username: "",
      password: "Luchoesgay",
      properties: this.getProperties()
    };
  }

  private getProperties(): Map<string, any> {
    let properties: Map<string, any> = new Map<string, any>();
    properties.set("IDENTIFICATION", "312828031");
    return properties;
  }
}
