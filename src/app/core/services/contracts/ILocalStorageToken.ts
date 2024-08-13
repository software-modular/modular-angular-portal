export interface ILocalStorageToken {
  setToken(token: string): void;
  removeToken(): void;
  getToken(): string;
  validToken(token: string): Boolean;
  decodeToken(token: string): void;
  setRefreshToken(refreshToken: string): void;
  removeRefreshToken(): void;
}
