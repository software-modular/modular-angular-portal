import { Component } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import {
  getCityByCode,
  getDepartmentByCode,
} from '../../core/domain/const/Colombia';
import { AgrappCardInput } from '../../core/domain/beans/agrappCardInput';
import { projectList } from '../../core/domain/const/Mocks';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'agrapp-home',
  templateUrl: './agrapp-home.component.html',
  styleUrl: './agrapp-home.component.css',
})
export class AgrappHomeComponent {
  projects: ProjectDto[] = [];

  constructor(
    private projectService: ProjectService,
    private authenticationService: AuthenticationService
  ) {}

  userIsAuthenticate(): Boolean {
    return this.authenticationService.userIsAuthenticated();
  }

  getWhatsappNumber() {
    return environment.aditionalInfo.whatsappNumber;
  }

  getProjects() {
    this.projectService.findAllPublicProjects().subscribe({
      next: (data) => {
        this.projects = data.results;
      },
      error: (_) => {
        console.log('No se encontraron proyectos');
      },
    });
  }
}
