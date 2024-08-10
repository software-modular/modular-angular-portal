import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  constructor(private auhtenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) { }

  testApi() {
    let userLogin = {
      document_id: "312828031",
      password: "Luchoesgay"
    }
    let urlLogin: string = "http://127.0.0.1:8000/api/users/login/";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClient.post(urlLogin, userLogin, { headers: headers }).subscribe({
      next: (data: any) => {
        debugger
      }, error: (err) => {
        debugger
      }
    });
  }
}
