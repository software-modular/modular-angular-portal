import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTypeOptions } from '../../core/domain/const/UserTypeOptions';
import { OptionInput } from '../../core/domain/beans/OptionInput';
import { ResponseClientDto } from '../../core/domain/dto/responseClientDto';
import { ReesponseUserTableDto, ReesponseUserTableDto as ResponseUserTableDto } from '../../core/domain/dto/responseUserTableDto';
import { TypeClient } from '../../core/domain/enum/TypeClient';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../core/services/client/user.service';

@Component({
  selector: 'agrapp-manage-user',
  templateUrl: './agrapp-manage-user.component.html',
  styleUrl: './agrapp-manage-user.component.css'
})
export class AgrappManageUserComponent {
  users: ResponseClientDto[] = []
  formGroup: FormGroup;
  typeUserOptions: OptionInput[] = UserTypeOptions;
  dataSourceUsers = new MatTableDataSource(this.users);

  columns: string[] = ['Nombre', 'Correo', 'Identificación', 'Telefono', "Dirección", "Activo", 'Actions'];

  @ViewChild('paginatorUsers') paginatorUsers!: MatPaginator;
  @ViewChild('sortUsers') sortOig!: MatSort;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formGroup = this.formBuilder.group({
      typeUser: ["", [Validators.required]],
      filter: ["", []]
    });
    this.doTypeUserValueChangeEvent();
  }

  doTypeUserValueChangeEvent() {
    this.formGroup.get("typeUser")?.valueChanges.subscribe({
      next: (data: string) => {
        this.getListUserByType(data);
      }
    });
  }

  getListUserByType(data: string) {
    switch (data) {
      case TypeClient.CLIENT: {
        this.getListUserClient();
        break
      }
      case TypeClient.STAFF: {
        this.getListUserStaff();
        break;
      }
      default: {
        break;
      }
    }
    return [];
  }

  getListUserStaff() {
    this.userService.findAllStaffs().subscribe({
      next: (data: ReesponseUserTableDto) => {
        this.updateUserListTable(data.results)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getListUserClient() {
    this.userService.findAllClients().subscribe({
      next: (data: ReesponseUserTableDto) => {
        this.updateUserListTable(data.results)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  updateUserListTable(data: ResponseClientDto[]) {
    this.users = data;
    this.dataSourceUsers = new MatTableDataSource(this.users);
    this.dataSourceUsers.paginator = this.paginatorUsers;
  }

  onPageTableOigChange(event: any) {
    this.dataSourceUsers.paginator!.pageIndex = event.pageIndex;
    this.dataSourceUsers.paginator!.pageSize = event.pageSize;
  }
}
