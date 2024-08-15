import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTypeOptions } from '../../core/domain/const/UserTypeOptions';
import { OptionInput } from '../../core/domain/beans/OptionInput';
import { ResponseClientDto } from '../../core/domain/dto/responseClientDto';
import { ReesponseUserTableDto as ResponseUserTableDto } from '../../core/domain/dto/responseUserTableDto';
import { TypeClient } from '../../core/domain/enum/TypeClient';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      typeUser: ["", [Validators.required]],
      filter: ["", []]
    });
    this.doTypeUserValueChangeEvent();
  }

  doTypeUserValueChangeEvent() {
    this.formGroup.get("typeUser")?.valueChanges.subscribe({
      next: (data: string) => {
        this.users = this.getListUserByType(data);
        this.dataSourceUsers = new MatTableDataSource(this.users);
        this.dataSourceUsers.paginator = this.paginatorUsers;
      }
    });
  }

  getListUserByType(data: string): ResponseClientDto[] {
    switch (data) {
      case TypeClient.CLIENT: {
        return this.getListUserClient().results;
      }
      case TypeClient.STAFF: {
        return this.getListUserStaff().results;
      }
      default: {
        break;
      }
    }
    return [];
  }

  getListUserStaff(): ResponseUserTableDto {
    return {
      count: 1,
      next: undefined,
      previous: undefined,
      results: [{
        code_staff: 1,
        ocupation_staff: 1,
        user: {
          document_id: "1144096208",
          type_ide: "CC",
          profile_picture: "",
          name: "Named",
          email: "",
          phone: "",
          address: "",
          date_of_birth: "1997-04-23",
          is_active: true,
          is_staff: true
        }
      }]
    };
  }

  getListUserClient(): ResponseUserTableDto {
    return {
      count: 1,
      next: undefined,
      previous: undefined,
      results: [{
        code_client: 2,
        ocupation_staff: 1,
        user: {
          document_id: "312828031",
          type_ide: "CC",
          type_user: "CL",
          profile_picture: "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",
          name: "Elvis Presly",
          email: "elvis@gmail.com",
          phone: "3205874567",
          address: "cr 1j # 89 -78",
          date_of_birth: "1957-11-30",
          is_active: true
        }
      }]
    };
  }

  onPageTableOigChange(event: any) {
    this.dataSourceUsers.paginator!.pageIndex = event.pageIndex;
    this.dataSourceUsers.paginator!.pageSize = event.pageSize;
  }
}
