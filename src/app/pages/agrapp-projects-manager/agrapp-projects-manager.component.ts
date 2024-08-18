import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { projectList } from '../../core/domain/const/Mocks';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { ProjectService } from '../../core/services/project/project.service';

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
    public dialog: MatDialog,
    private router: Router
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

  redirectToRegisterProject(project: ProjectDto) {
    this.router.navigate(["/portal/project/register", project.code_project]);
  }





}
