import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClientService: HttpClientService) { }

  findClientById(id: string): Observable<any> {
    let url = `${environment.api.host}${environment.api.endpoints.users.getClientById.replace('%s', id)}`
    return this.httpClientService.get(url, this.headers);
  }

  findAllClients() {
    let url = `${environment.api.host}${environment.api.endpoints.users.getAllClient}`
    return this.httpClientService.get(url, this.headers);
  }

  deleteClient(id: Number) {
    let url = `${environment.api.host}${environment.api.endpoints.users.deleteUser}`.replace('%s', `${id}`);
    return this.httpClientService.delete(url, this.headers);
  }


  findAllStaffs() {
    let url = `${environment.api.host}${environment.api.endpoints.users.getAllStaff}`
    return this.httpClientService.get(url, this.headers);
  }

  createStaff(data: any) {
    let url = `${environment.api.host}${environment.api.endpoints.users.createStaff}`
    return this.httpClientService.post(url, data, this.headers);
  }


}
