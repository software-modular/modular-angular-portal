import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDto } from '../../../domain/dto/userLoginDto';
import { UserAuthenticateData } from '../../../domain/entity/UserAuthenticate';
import { Authenticator } from '../../../domain/contracts/Authenticator';
import { HttpClientService } from '../../http/http-client.service';
import { UserResgisterData } from '../../../domain/entity/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorDefaultService implements Authenticator {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClientService: HttpClientService
  ) { }

  authenticate(userData: UserAuthenticateData, url: string): Observable<any> {
    let userLogin: UserLoginDto = {
      document_id: userData.properties?.get("IDENTIFICATION"),
      password: userData.password
    }
    return this.httpClientService.post(url, userLogin, this.headers)
  }

  registerUser(userData: any, url: string): Observable<any> {
    return this.httpClientService.post(url, userData, this.headers);
  }

}
