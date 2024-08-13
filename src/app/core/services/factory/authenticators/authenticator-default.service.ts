import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDto } from '../../../domain/dto/userLoginDto';
import { UserAuthenticateData } from '../../../domain/entity/UserAuthenticate';
import { Authenticator } from '../../contracts/Authenticator';
import { HttpClientService } from '../../http/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorDefaultService implements Authenticator {

  constructor(private httpClientService: HttpClientService
  ) { }

  authenticate(userData: UserAuthenticateData, url: string): Observable<any> {
    let userLogin: UserLoginDto = {
      document_id: userData.properties?.get("IDENTIFICATION"),
      password: userData.password
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClientService.post(url, userLogin, headers)
  }

  logout(userData: UserAuthenticateData): void {
    throw new Error('Method not implemented.');
  }
}
