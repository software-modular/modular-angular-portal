export interface ILocalStorageToken {
  setToken(token: string): void;
  removeToken(): void;
  getToken(): string;
  validToken(token: string): boolean;
}
