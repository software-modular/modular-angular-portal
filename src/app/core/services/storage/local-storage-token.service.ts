import { Injectable } from '@angular/core';
import { JwtContent } from '../../domain/beans/jwtContent';
import { LocalStorageTokenNames } from '../../domain/enum/LocalStorageTokenNames';

import { ILocalStorageToken } from '../contracts/ILocalStorageToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageTokenService implements ILocalStorageToken {



  constructor() { }


  setToken(token: string): void {
    localStorage.setItem(LocalStorageTokenNames.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(LocalStorageTokenNames.TOKEN_KEY);
  }

  getToken(): string {
    if (typeof window !== 'undefined') {
      return `${localStorage.getItem(LocalStorageTokenNames.TOKEN_KEY)}`;
    }
    return '';
  }

  validToken(): boolean {
    let token = this.getToken();
    if (token !== null && token !== 'null'
      && token !== undefined && token !== '') {
      return true;
    }
    return false;
  }

  decodeToken(token: string): JwtContent {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error al decodificar el payload:', error);
      return {};
    }
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(LocalStorageTokenNames.REFRESH_TOKEN_KEY, refreshToken);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(LocalStorageTokenNames.REFRESH_TOKEN_KEY);
  }
}
