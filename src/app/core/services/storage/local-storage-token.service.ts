import { Injectable } from '@angular/core';
import { ILocalStorageToken } from '../contracts/ILocalStorageToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageTokenService implements ILocalStorageToken {

  private readonly TOKEN_KEY: string = "AUTHENTICATION_TOKE";

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string {
    return `${localStorage.getItem(this.TOKEN_KEY)}`;
  }

  validToken(token: string): boolean {
    if (token !== null && token !== 'null'
      && token !== undefined && token !== '') {
      return true;
    }
    return false;
  }
}
