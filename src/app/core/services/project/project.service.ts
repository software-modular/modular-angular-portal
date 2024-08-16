import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProjectDto } from '../../domain/dto/projectDto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClientService: HttpClientService) { }

  findAllProjects() {
    let url = `${environment.api.host}${environment.api.endpoints.users.findAllProjects}`
    return this.httpClientService.get(url, this.headers);
  }

  createProject(project: ProjectDto) {
    let url = `${environment.api.host}${environment.api.endpoints.users.createProject}`
    return this.httpClientService.post(url, project, this.headers);
  }
}
