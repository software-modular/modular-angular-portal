import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'primeng/api';
import { UserModalComponent } from '../../components/agrapp-modals/user-modal/user-modal.component';
import { OptionInput } from '../../core/domain/beans/OptionInput';
import { UserTypeOptions } from '../../core/domain/const/UserTypeOptions';
import { ResponseClientDto } from '../../core/domain/dto/responseClientDto';
import { ResponseUserTableDto } from '../../core/domain/dto/responseUserTableDto';
import { TypeClient } from '../../core/domain/enum/TypeClient';
import { TypeModalMode } from '../../core/domain/enum/TypeModalMode';
import { UserService } from '../../core/services/client/user.service';
import { InputUserModal } from '../../core/domain/beans/inputUserModal';
import { downloadFile } from '../../core/utils/FileUtils';

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
  typeClientSelect: string = "";

  columns: string[] = ['Nombre', 'Correo', 'Identificación', 'Telefono', "Dirección", "Activo", "inversiones_habilitadas", 'Actions'];

  @ViewChild('paginatorUsers') paginatorUsers!: MatPaginator;
  @ViewChild('sortUsers') sortOig!: MatSort;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      typeUser: ["", [Validators.required]],
      filter: ["", []]
    });
    this.doTypeUserValueChangeEvent();

  }

  private doTypeUserValueChangeEvent() {
    this.formGroup.get("typeUser")?.valueChanges.subscribe({
      next: (data: string) => {
        this.typeClientSelect = data;
        this.getListUserByType(this.typeClientSelect);
      }
    });
  }

  applyFilterUsersTable() {
    this.applyFilterBusiness(this.formGroup.get('filter')?.value)
  }

  private applyFilterBusiness(value: string) {
    this.dataSourceUsers.filter = value.trim().toLowerCase();
  }

  private getListUserByType(data: string) {
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

  private getListUserStaff() {
    this.userService.findAllStaffs().subscribe({
      next: (data: ResponseUserTableDto) => {
        this.updateUserListTable(data.results)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  private getListUserClient() {
    this.userService.findAllClients().subscribe({
      next: (data: ResponseUserTableDto) => {
        this.updateUserListTable(data.results)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  private updateUserListTable(data: ResponseClientDto[]) {
    this.users = data;
    this.dataSourceUsers = new MatTableDataSource(this.users);
    this.dataSourceUsers.paginator = this.paginatorUsers;
    this.loadDataSourceFilter()
  }


  deleteClient(user: ResponseClientDto) {
    if (user.user.is_staff) {
      this.userService.deleteStaff(user.code_staff).subscribe({
        next: (_) => {
          this.showNotification("Eliminar usuario", "Usuario eliminado", "pi pi-exclamation-triangle")
          this.getListUserByType(this.typeClientSelect);
        }, error: (_) => {
          this.showNotification("Eliminar usuario", "No fue posible eliminar el usuario", "pi pi-exclamation-triangle")
        }
      });
    } else {
      this.userService.deleteClient(user.code_client).subscribe({
        next: (_) => {
          this.showNotification("Eliminar usuario", "Usuario eliminado", "pi pi-exclamation-triangle")
          this.getListUserByType(this.typeClientSelect);
        }, error: (_) => {
          this.showNotification("Eliminar usuario", "No fue posible eliminar el usuario", "pi pi-exclamation-triangle")
        }
      });
    }
  }

  onPageTableUsersChange(event: any) {
    this.dataSourceUsers.paginator!.pageIndex = event.pageIndex;
    this.dataSourceUsers.paginator!.pageSize = event.pageSize;
  }

  private showNotification(titleHeader: string, message: string, icon: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: icon,
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
    });
  }


  private loadDataSourceFilter() {
    this.dataSourceUsers.filterPredicate = (data: ResponseClientDto, filter: string) => {
      return this.customFilter(data, filter);
    }
  }

  private customFilter(data: ResponseClientDto, filter: string): boolean {
    const filterValue = filter.trim().toLowerCase();
    const dataStr = JSON.stringify(data).toLowerCase();
    if (filter === '') {
      return true;
    }
    return dataStr.includes(filterValue);
  }

  enableInversions(user: ResponseClientDto, enable: boolean) {
    this.userService.enableInversions(`${user.code_client}`, enable).subscribe({
      next: (data) => {
        let message: string = `Se  ${enable ? 'habilitaron' : 'deshabilitaron'} las inversiones para el usuario`;
        this.showMessageDialog("Activación inversiones", message);
        this.getListUserClient();
      },
      error: (_) => {
        let message: string = `No fue posible ${enable ? 'habilitar' : 'deshabilitar'} las inversiones para el usuario`;
        this.showMessageDialog("Activación inversiones", message);
      }
    });
  }

  createUser() {
    this.openModal(UserModalComponent);
  }

  viewUser(user: ResponseClientDto) {
    let data: InputUserModal = {
      mode: TypeModalMode.VIEW,
      data: user.user
    }
    this.openModal(UserModalComponent, data);
  }

  private openModal(component: any, data?: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      data: data
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.getListUserByType(this.typeClientSelect);
    });
  }

  downloadAgreement(user: ResponseClientDto) {
    if (user.mandate_contract) {
      this.userService.getAgreementUrl(`${user.code_client}`).subscribe(
        {
          next: (data) => {
            window.open(data.pdf_url, "_blank");
          }
        }
      );
    }
  }

  private showMessageDialog(titleHeader: string, message: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-success',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
    });
  }
}

