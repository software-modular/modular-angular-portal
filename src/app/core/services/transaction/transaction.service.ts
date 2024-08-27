import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { TransactionDto } from '../../domain/dto/transactions';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClientService: HttpClientService) { }

  createTransaction(trasaction: TransactionDto) {
    let url = `${environment.api.host}${environment.api.endpoints.users.createTransaction}`
    return this.httpClientService.post(url, trasaction, this.headers);
  }

  findTransactionById(id: string) {
    let url = `${environment.api.host}${environment.api.endpoints.users.findTrasactionById}${id}`
    return this.httpClientService.get(url, this.headers);
  }


  findAllTransaction() {
    let url = `${environment.api.host}${environment.api.endpoints.users.findAllTrasactions}`
    return this.httpClientService.get(url, this.headers);
  }


}
