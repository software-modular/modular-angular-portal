import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { JwtContent } from '../../domain/beans/jwtContent';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { ResponseLoginDto } from '../../domain/dto/responseLoginDto';
import { ClientRegisterData } from '../../domain/entity/ClientRegister';
import { UserAuthenticateData } from '../../domain/entity/UserAuthenticate';
import { TypeAuthenticator } from '../../domain/enum/TypeAuthenticator';
import { TypeAuthenticatorUtils } from '../../utils/TypeAuthenticatorUtils';
import { Authenticator } from '../../domain/contracts/Authenticator';
import { AuthenticatorFactory } from '../factory/AuthenticatorFactory';
import { LocalStorageTokenService } from './../storage/local-storage-token.service';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authenticator: Authenticator;

  constructor(
    private httpClient: HttpClient,
    private localStorageTokenService: LocalStorageTokenService,
  ) {
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
      if (response.data?.client !== undefined) {
        this.localStorageTokenService.setUserData(response.data?.client);
      }
      if (response.data?.staff !== undefined) {
        this.localStorageTokenService.setUserData(response.data?.staff);
      }
    }
    return new Promise((resolve, reject) => {
      if (response.data?.client !== undefined) {
        resolve(response.data.client);
        return;
      }
      if (response.data?.staff !== undefined) {
        resolve(response.data.staff);
        return;
      }
      reject(response);
    });
  }

  logoutUser() {
    this.localStorageTokenService.removeToken();
    this.localStorageTokenService.removeRefreshToken();
    this.localStorageTokenService.removeUserData();
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

  getRefreshToken(): string {
    return this.localStorageTokenService.getRefreshToken();
  }

  getTokenData(): JwtContent {
    return this.localStorageTokenService.decodeToken();
  }

  getUserInformation(): ResponseClientDto {
    return this.localStorageTokenService.getUserData();
  }

  updateUserAuthenticated(user: ResponseClientDto) {
    this.localStorageTokenService.setUserData(user);
  }



  refreshAccessToken(): Observable<string | null> {
    const refreshToken = this.getRefreshToken();
    const urlRefreshToken = environment.api.endpoints.users.loginRefresh;
    if (!refreshToken) return of(null);
    return this.httpClient.post<{ accessToken: string }>(urlRefreshToken, { token: refreshToken }).pipe(
      map(response => {
        const newAccessToken = response.accessToken;
        localStorage.setItem('accessToken', newAccessToken); // Guardar el nuevo token
        return newAccessToken; // Retorna el nuevo token como string
      }),
      catchError(() => {
        console.error('Error refreshing token');
        return of(null); // Retorna null si hay un error
      })
    );
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
