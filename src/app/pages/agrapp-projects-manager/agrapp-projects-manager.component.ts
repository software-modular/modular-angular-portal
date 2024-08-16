import { Component, ViewChild } from '@angular/core';
import { ResponseClientDto } from '../../core/domain/dto/responseClientDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionInput } from '../../core/domain/beans/OptionInput';
import { MatTableDataSource } from '@angular/material/table';
import { UserTypeOptions } from '../../core/domain/const/UserTypeOptions';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserModalComponent } from '../../components/agrapp-modals/user-modal/user-modal.component';
import { TypeModalMode } from '../../core/domain/enum/TypeModalMode';
import { InputUserModal } from '../../core/domain/beans/inputUserModal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseUserTableDto } from '../../core/domain/dto/responseUserTableDto';
import { TypeClient } from '../../core/domain/enum/TypeClient';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../core/services/client/user.service';
import { ProjectService } from '../../core/services/project/project.service';
import { ProjectModalComponent } from '../../components/agrapp-modals/project-modal/project-modal.component';

@Component({
  selector: 'app-agrapp-projects-manager',
  templateUrl: './agrapp-projects-manager.component.html',
  styleUrl: './agrapp-projects-manager.component.css'
})
export class AgrappProjectsManagerComponent {
  users: ResponseClientDto[] = []
  formGroup: FormGroup;
  typeUserOptions: OptionInput[] = UserTypeOptions;
  dataSourceProjects = new MatTableDataSource(this.users);
  typeClientSelect: string = "";

  columns: string[] = ['Nombre', 'Correo', 'Identificación', 'Telefono', "Dirección", "Activo", 'Actions'];

  @ViewChild('paginatorUsers') paginatorUsers!: MatPaginator;
  @ViewChild('sortUsers') sortOig!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      filter: ["", []]
    });
  }


  applyFilterProjectsTable() {
    this.applyFilter(this.formGroup.get('filter')?.value)
  }

  applyFilter(value: string) {
    this.dataSourceProjects.filter = value.trim().toLowerCase();
  }

  getListProjects(data: string) {

    return [];
  }


  updateProjectListTable(data: ResponseClientDto[]) {
    this.users = data;
    this.dataSourceProjects = new MatTableDataSource(this.users);
    this.dataSourceProjects.paginator = this.paginatorUsers;
    this.loadDataSourceFilter()
  }


  deleteProject(user: ResponseClientDto) {
    if (user.code_client !== undefined) {
      this.userService.deleteClient(user.code_client).subscribe({
        next: (_) => {
          this.showNotification("Eliminar usuario", "Usuario eliminado", "pi pi-exclamation-triangle")
        }, error: (_) => {
          this.showNotification("Eliminar usuario", "No fue posible eliminar el usuario", "pi pi-exclamation-triangle")
        }
      });
    }
  }

  onPageProjectChange(event: any) {
    this.dataSourceProjects.paginator!.pageIndex = event.pageIndex;
    this.dataSourceProjects.paginator!.pageSize = event.pageSize;
  }

  showNotification(titleHeader: string, message: string, icon: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: icon,
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
    });
  }


  loadDataSourceFilter() {
    this.dataSourceProjects.filterPredicate = (data: ResponseClientDto, filter: string) => {
      return this.customFilter(data, filter);
    }
  }

  customFilter(data: ResponseClientDto, filter: string): boolean {
    const filterValue = filter.trim().toLowerCase();
    const dataStr = JSON.stringify(data).toLowerCase();
    if (filter === '') {
      return true;
    }
    return dataStr.includes(filterValue);
  }


  createProject() {
    this.openModal(ProjectModalComponent);
  }

  viewProject(user: ResponseClientDto) {
    let data: InputUserModal = {
      mode: TypeModalMode.VIEW,
      data: user.user
    }
    this.openModal(ProjectModalComponent, data);
  }

  openModal(component: any, data?: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      data: data
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.getListProjects(this.typeClientSelect);
    });
  }
}
