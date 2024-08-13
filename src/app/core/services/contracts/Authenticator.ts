import { Observable } from "rxjs";
import { UserAuthenticateData } from "../../domain/entity/UserAuthenticate";

export interface Authenticator {
  authenticate(userData: UserAuthenticateData, url: string): Observable<any>;
  logout(userData: UserAuthenticateData): void;
}
