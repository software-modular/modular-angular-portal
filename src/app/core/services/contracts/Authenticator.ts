import { Observable } from "rxjs";
import { UserAuthenticateData } from "../../domain/entity/UserAuthenticate";
import { UserResgisterData } from "../../domain/entity/UserRegister";

export interface Authenticator {
  authenticate(userData: UserAuthenticateData, url: string): Observable<any>;
  registerUser(userData: any, url: string): Observable<any>;
}
