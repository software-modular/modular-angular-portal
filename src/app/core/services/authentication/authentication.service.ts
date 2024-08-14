import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { ResponseLoginDto } from '../../domain/dto/responseLoginDto';
import { ClientRegisterData } from '../../domain/entity/ClientRegister';
import { UserAuthenticateData } from '../../domain/entity/UserAuthenticate';
import { TypeAuthenticator } from '../../domain/enum/TypeAuthenticator';
import { TypeAuthenticatorUtils } from '../../utils/TypeAuthenticatorUtils';
import { Authenticator } from '../contracts/Authenticator';
import { AuthenticatorFactory } from '../factory/AuthenticatorFactory';
import { LocalStorageTokenService } from '../storage/local-storage-token.service';
import { JwtContent } from '../../domain/beans/jwtContent';

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

  async authenticateUser(identification: string, password: string): Promise<ResponseClientDto> {
    let urlLogin: string = `${environment.api.host}${environment.api.endpoints.users.login}`;
    let response: ResponseLoginDto = await firstValueFrom(this.authenticator.authenticate(
      this.getUserAuthenticateData(identification, password), urlLogin));
    if (response.code == 200) {
      this.localStorageTokenService.setToken(response.data?.access || '');
      this.localStorageTokenService.setRefreshToken(response.data?.refresh || '');
    }
    return new Promise((resolve, reject) => {
      if (response.data?.client !== undefined) {
        resolve(response.data.client);
      }
      reject(response);
    });
  }

  logoutUser() {
    this.localStorageTokenService.removeToken();
    this.localStorageTokenService.removeRefreshToken();
  }

  registerUser(userRegister: ClientRegisterData): Observable<any> {
    let urlRegister: string = `${environment.api.host}${environment.api.endpoints.users.createClient}`;
    return this.authenticator.registerUser(userRegister, urlRegister);
  }

  userIsAuthenticated(): Boolean {
    return this.localStorageTokenService.validToken();
  }

  getAuthenticationToken(): string {
    return this.localStorageTokenService.getToken();
  }

  getTokenData(): JwtContent {
    return this.localStorageTokenService.decodeToken();
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
