import { Injectable } from '@angular/core';
import { Authenticator } from '../../contracts/Authenticator';
import { UserAuthenticateData } from '../../../domain/entity/UserAuthenticate';
import { HttpClientService } from '../../http/http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorDefaultService implements Authenticator {

  constructor(private httpClientService: HttpClientService,
    private httpclient: HttpClient
  ) { }
  authenticate(userData: UserAuthenticateData) {
    debugger
    let userLogin = {
      document_id: userData.properties?.get("IDENTIFICATION"),
      password: userData.password
    }
    let urlLogin: string = "http://127.0.0.1:8000/api/users/login/";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpclient.post(urlLogin, userLogin, { headers: headers }).subscribe({
      next: (data: any) => {
        debugger
      }, error: (err) => {
        debugger
      }
    });
    /*this.httpClientService.post(urlLogin, userLogin, headers).subscribe({
      next: (data: any) => {
        debugger
      }, error: (err) => {
        debugger
      }
    });
*/
  }
  logout(userData: UserAuthenticateData): void {
    throw new Error('Method not implemented.');
  }
}
