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
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { projectList } from '../../core/domain/const/Mocks';

@Component({
  selector: 'app-agrapp-projects-manager',
  templateUrl: './agrapp-projects-manager.component.html',
  styleUrl: './agrapp-projects-manager.component.css'
})
export class AgrappProjectsManagerComponent {
  projects: ProjectDto[] = []
  formGroup: FormGroup;
  dataSourceProjects = new MatTableDataSource(this.projects);
  typeClientSelect: string = "";

  columns: string[] = ['Nombre proyecto', 'Estado', 'Fecha inicio', 'Fecha fin', 'Departamento', "Ciudad", "Nombre productor",
    "Correo productor", "Telefono productor", 'Dirección productor', "Acciones"];

  @ViewChild('paginatorProjects') paginatorProjects!: MatPaginator;
  @ViewChild('sortProject') sortProject!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      filter: ["", []]
    });

    this.fillTableProjects();
    this.doTypeUserValueChangeEvent();
  }

  doTypeUserValueChangeEvent() {
    this.formGroup.get("filter")?.valueChanges.subscribe({
      next: (data: string) => {
      }
    });
  }

  fillTableProjects() {
    this.projects = projectList;
    //hace peticion
    this.dataSourceProjects = new MatTableDataSource(this.projects);
    this.dataSourceProjects.paginator = this.paginatorProjects;
    this.applyFilterProjectsTable();
  }

  applyFilterProjectsTable() {
    this.applyFilter(this.formGroup.get('filter')?.value)
  }

  applyFilter(value: string) {
    this.dataSourceProjects.filter = value.trim().toLowerCase();
  }

  updateProjectListTable(data: ProjectDto[]) {
    this.projects = data;
    this.dataSourceProjects = new MatTableDataSource(this.projects);
    this.dataSourceProjects.paginator = this.paginatorProjects;
    this.loadDataSourceFilter()
  }


  deleteProject(user: ProjectDto) {
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
    this.dataSourceProjects.filterPredicate = (data: ProjectDto, filter: string) => {
      return this.customFilter(data, filter);
    }
  }

  customFilter(data: ProjectDto, filter: string): boolean {
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

  viewProject(project: ProjectDto) {
    let data: InputUserModal = {
      mode: TypeModalMode.EDIT,
      data: project
    }
    this.openModal(ProjectModalComponent, data);
  }

  openModal(component: any, data?: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      data: data
    });
    dialogRef.afterClosed().subscribe((_) => {
    });
  }
}
