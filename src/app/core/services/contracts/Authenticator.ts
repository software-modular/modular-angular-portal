import { UserAuthenticateData } from "../../domain/entity/UserAuthenticate";

export interface Authenticator {
  authenticate(userData: UserAuthenticateData, url: string): any;
  logout(userData: UserAuthenticateData): void;
}
