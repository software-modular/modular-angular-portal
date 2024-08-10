import { Injectable } from '@angular/core';
import { Authenticator } from '../../contracts/Authenticator';
import { UserAuthenticateData } from '../../../domain/entity/UserAuthenticate';
import { HttpClientService } from '../../http/http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseDataDto } from '../../../domain/dto/responseDataDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorDefaultService implements Authenticator {

  constructor(private httpClientService: HttpClientService,
  ) { }

  authenticate(userData: UserAuthenticateData, url: string) {
    debugger
    let userLogin = {
      document_id: userData.properties?.get("IDENTIFICATION"),
      password: userData.password
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClientService.post(url, userLogin, headers).subscribe({
      next: (data: ResponseDataDto) => {
        debugger
      }, error: (err) => {
        debugger
      }
    });
  }

  logout(userData: UserAuthenticateData): void {
    throw new Error('Method not implemented.');
  }
}
