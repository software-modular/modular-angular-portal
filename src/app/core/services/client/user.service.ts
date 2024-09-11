import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseUserDto } from '../../domain/dto/responseUserDto';
import { HttpClientService } from '../http/http-client.service';

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

  updateClient(user: ResponseUserDto, id: string) {
    let url = `${environment.api.host}${environment.api.endpoints.users.updateClient.replace("%s", id)}`
    return this.httpClientService.patch(url, user, this.headers);
  }

  uploadContractUser(idUser: string, file: File) {
    let url = `${environment.api.host}${environment.api.endpoints.users.uploadContractUser}${idUser}`;
    return this.httpClientService.post(url, this.getFormDataContract(file));
  }

  updateStaff(user: ResponseUserDto, id: string) {
    let url = `${environment.api.host}${environment.api.endpoints.users.updateStaff.replace("%s", id)}`
    let data = {
      user: user
    };
    return this.httpClientService.patch(url, data, this.headers);
  }

  deleteClient(id?: Number) {
    let url = `${environment.api.host}${environment.api.endpoints.users.deleteClient}`.replace('%s', `${id}`);
    return this.httpClientService.delete(url, this.headers);
  }


  deleteStaff(id?: Number) {
    let url = `${environment.api.host}${environment.api.endpoints.users.deleteStaff}`.replace('%s', `${id}`);
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

  getAgreementUrl(userId?: string) {
    let url = `${environment.api.host}${environment.api.endpoints.users.getAgreementByUserId}${userId}`;
    return this.httpClientService.get(url, this.headers);
  }

  enableInversions(userId: string, enabled: boolean) {
    let url = `${environment.api.host}${environment.api.endpoints.users.enableInversionsByUserId}${userId}`;
    return this.httpClientService.patch(url, {
      "status": enabled
    },
      this.headers);
  }


  private getFormDataContract(file: any): FormData {
    const formData = new FormData();
    formData.append('mandate_contract', file, file.name);
    return formData;
  }


}
