import { Observable } from "rxjs";
import { UserAuthenticateData } from "../entity/UserAuthenticate";
import { UserResgisterData } from "../entity/UserRegister";

export interface Authenticator {
  authenticate(userData: UserAuthenticateData, url: string): Observable<any>;
  registerUser(userData: any, url: string): Observable<any>;
}
