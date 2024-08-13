import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseLoginDto } from '../../domain/dto/responseLoginDto';
import { UserAuthenticateData } from '../../domain/entity/UserAuthenticate';
import { TypeAuthenticator } from '../../domain/enum/TypeAuthenticator';
import { TypeAuthenticatorUtils } from '../../utils/TypeAuthenticatorUtils';
import { Authenticator } from '../contracts/Authenticator';
import { AuthenticatorFactory } from '../factory/AuthenticatorFactory';
import { LocalStorageTokenService } from '../storage/local-storage-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authenticator: Authenticator;

  constructor(private localStorageTokenService: LocalStorageTokenService,) {
    let authenticatorFactory = new AuthenticatorFactory();
    let typeAuthenticator: TypeAuthenticator = TypeAuthenticatorUtils
      .getAutheticatorTypeByName(environment.configuration.typeAuthenticator);
    this.authenticator = authenticatorFactory.getAutenticator(typeAuthenticator);
  }

  async authenticateUser(identification: string, password: string) {
    let urlLogin: string = `${environment.api.host}${environment.api.endpoints.users.login}`;
    let response: ResponseLoginDto = await firstValueFrom(this.authenticator.authenticate(
      this.getUserAuthenticateData(identification, password), urlLogin));
    if (response.code == 200) {
      this.localStorageTokenService.setToken(response.data?.access || '');
      this.localStorageTokenService.setRefreshToken(response.data?.refresh || '');
    }
  }

  userIsAuthenticated(): Boolean {
    let token: string = this.localStorageTokenService.getToken();
    return this.localStorageTokenService.validToken(token);
  }

  getAuthenticationToken(): string {
    return this.localStorageTokenService.getToken();
  }


  private getAuthenticator(): Authenticator {
    return this.authenticator;
  }

  private getUserAuthenticateData(identification: string, password: string): UserAuthenticateData {
    return {
      username: "",
      password: password,
      properties: this.getProperties(identification)
    };
  }

  private getProperties(identification: string): Map<string, any> {
    let properties: Map<string, any> = new Map<string, any>();
    properties.set("IDENTIFICATION", identification);
    return properties;
  }
}
