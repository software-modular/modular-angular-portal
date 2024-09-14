import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ResponseClientDto } from '../../core/domain/dto/responseClientDto';
import { TransactionResponseDto } from '../../core/domain/dto/transactionResponseDto';
import { TransactionDto } from '../../core/domain/dto/transactions';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { TransactionService } from '../../core/services/transaction/transaction.service';

@Component({
  selector: 'app-agrapp-transactions-list',
  templateUrl: './agrapp-transactions-list.component.html',
  styleUrl: './agrapp-transactions-list.component.css'
})
export class AgrappTransactionsListComponent {
  formGroup: FormGroup;
  transactions: TransactionResponseDto[] = []
  userInfo: ResponseClientDto;
  dataSourceTransaction = new MatTableDataSource(this.transactions);

  columns: string[] = ['cliente', 'nombre_proyecto', 'transaction_id', 'payment_reference', 'start_date', 'estado', 'payment_type', 'moneda', 'tipo_inversion', 'inversion', 'url_pago'];


  @ViewChild('paginatorTransaction') paginatorTransaction!: MatPaginator;
  @ViewChild('sortTransaction') sortTransaction!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private transactionService: TransactionService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      filter: ["", []]
    });
    this.userInfo = authenticationService.getUserInformation();
    this.dataSourceTransaction.paginator = this.paginatorTransaction;
    this.dataSourceTransaction.sort = this.sortTransaction;
    this.fillTableTransactions();
    this.doTypeUserValueChangeEvent();
  }



  doTypeUserValueChangeEvent() {
    this.formGroup.get("filter")?.valueChanges.subscribe({
      next: (data: string) => {
      }
    });
  }



  fillTableTransactions() {
    this.transactionService.findAllTransaction().subscribe({
      next: (data: any) => {
        this.transactions = data.results;
        this.dataSourceTransaction = new MatTableDataSource(this.transactions);
        this.dataSourceTransaction.paginator = this.paginatorTransaction;
        this.dataSourceTransaction.sort = this.sortTransaction;
        this.applyFilterTransactionTable();
      }
    });
  }

  applyFilterTransactionTable() {
    this.applyFilter(this.formGroup.get('filter')?.value)
  }

  applyFilter(value: string) {
    this.dataSourceTransaction.filter = value.trim().toLowerCase();
  }


  onPageProjectChange(event: any) {
    this.dataSourceTransaction.paginator!.pageIndex = event.pageIndex;
    this.dataSourceTransaction.paginator!.pageSize = event.pageSize;
  }

  loadDataSourceFilter() {
    this.dataSourceTransaction.filterPredicate = (data: TransactionResponseDto, filter: string) => {
      return this.customFilter(data, filter);
    }
  }

  customFilter(data: TransactionResponseDto, filter: string): boolean {
    const filterValue = filter.trim().toLowerCase();
    const dataStr = JSON.stringify(data).toLowerCase();
    if (filter === '') {
      return true;
    }
    return dataStr.includes(filterValue);
  }

  showNotification(titleHeader: string, message: string,) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      acceptIcon: "none",
      acceptLabel: "Aceptar",
      rejectVisible: false,
    });
  }

  protected getStatus(code: string) {
    let status = "";
    if (code === "APPROVED") {
      status = "Aprobado";
    }
    if (code === "ERROR") {
      status = "Error";
    }
    if (code === "DECLINED") {
      status = "Declinado";
    }
    if (code === "WAITING") {
      status = "En espera";
    }
    return status;
  }

  getPaymentTypeByCode(code: string): string {
    if (code === "INV") {
      return "Inversión";
    }
    if (code === "PRP") {
      return "Inversión";
    }
    return "";
  }
}
