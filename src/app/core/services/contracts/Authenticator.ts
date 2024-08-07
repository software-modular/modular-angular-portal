import { UserAuthenticateData } from "../../domain/entity/UserAuthenticate";

export interface Authenticator {
  authenticate(userData: UserAuthenticateData): any;
  logout(userData: UserAuthenticateData): void;
}
