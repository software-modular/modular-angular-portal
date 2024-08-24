import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProjectDto } from '../../domain/dto/projectDto';
import { firstValueFrom } from 'rxjs';

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

  findAllPublicProjects() {
    let url = `${environment.api.host}${environment.api.endpoints.users.findAllPublicProjects}`
    return this.httpClientService.get(url, this.headers);
  }

  findProjectById(id: string) {
    let url = `${environment.api.host}${environment.api.endpoints.users.findProjectById}${id}`
    return this.httpClientService.get(url, this.headers);
  }

  findPublicProjectById(id: string) {
    let url = `${environment.api.host}${environment.api.endpoints.users.findPublicProjectById}${id}`
    return this.httpClientService.get(url, this.headers);
  }

  createProject(project: ProjectDto) {
    let url = `${environment.api.host}${environment.api.endpoints.users.createProject}`
    return this.httpClientService.post(url, project, this.headers);
  }

  async updateProject(project: ProjectDto, prepurcharseIsNull: Boolean): Promise<any> {
    let urlUpdateInformation = `${environment.api.host}${environment.api.endpoints.users.updateProjectInformation}`.replace('%s', `${project.code_project}`)
    let urlUpdateCrop = `${environment.api.host}${environment.api.endpoints.users.updateProjectCrop}${project.crop?.code_crop}`;
    let urlUpdateOwner = `${environment.api.host}${environment.api.endpoints.users.updateProjectOwner}${project.crop?.owner?.code_crop_owner}`;
    let urlUpdateInvestment = `${environment.api.host}${environment.api.endpoints.users.updateProjectInvestment}${project.invesment?.code_investment}`;
    let urlUpdatePrepurcharses = `${environment.api.host}${environment.api.endpoints.users.updateProjectPrepurcharse}${project.code_project}`;
    let urlCreatePrepurcharses = `${environment.api.host}${environment.api.endpoints.users.createProjectPrepurcharse}`;
    let prepurcharse: any;
    if (prepurcharseIsNull) {
      prepurcharse = await firstValueFrom(this.httpClientService.post(urlCreatePrepurcharses, this.getPrePurcharse(project), this.headers))
    } else {
      prepurcharse = await firstValueFrom(this.httpClientService.patch(urlUpdatePrepurcharses, this.getPrePurcharse(project), this.headers))
    }
    let infoProject = this.getProyectInformation(project, prepurcharse.code_pre_purcharse);
    let responseInformation = await firstValueFrom(this.httpClientService.patch(urlUpdateInformation, infoProject, this.headers));
    let responseInvestment = await firstValueFrom(this.httpClientService.patch(urlUpdateInvestment, this.getInvesment(project), this.headers));
    let responseOwner = await firstValueFrom(this.httpClientService.patch(urlUpdateOwner, this.getOwner(project), this.headers));
    let responseCrop = await firstValueFrom(this.httpClientService.patch(urlUpdateCrop, this.getCrop(project), this.headers));
    return new Promise((resolve, reject) => {
      if (!this.validResponse(prepurcharse) || this.validResponse(responseInformation)
        || this.validResponse(responseInvestment) || this.validResponse(responseOwner)
        || this.validResponse(responseCrop)) {
        resolve("Proyecto actualizado");
        return;
      } else {
        reject("Error actualizando proyecto");
      }
    });
  }

  private validResponse(response: any): Boolean {
    if (response.code !== 200) {
      return false;
    }
    return true;
  }

  private getProyectInformation(project: ProjectDto, code_prepurcharse: Number) {
    return {
      code_project: project.code_project,
      name: project.name,
      description: project.description,
      allow_prepurcharse: project.allow_prepurcharse,
      video_url: project.video_url,
      photo_1: project.photo_1,
      photo_2: project.photo_2,
      photo_3: project.photo_3,
      photo_4: project.photo_4,
      photo_5: project.photo_5,
      state: project.state,
      start_date: project.start_date,
      end_date: project.end_date,
      pre_purchase: code_prepurcharse
    }
  }

  private getCrop(project: ProjectDto) {
    return {
      code_crop: project.crop?.code_crop,
      country: project.crop?.country,
      department: project.crop?.department,
      municipality: project.crop?.municipality,
      address: project.crop?.address,
      type_of_ground: project.crop?.type_of_ground,
      number_of_hectares: project.crop?.number_of_hectares,
      number_of_plants: project.crop?.number_of_plants,
      vegetative_period: project.crop?.vegetative_period,
      productive_period: project.crop?.productive_period,
      cultivation_start_date: project.crop?.cultivation_start_date,
      estimated_harvest_date: project.crop?.estimated_harvest_date
    }
  }

  private getOwner(project: ProjectDto) {
    return {
      code_crop_owner: project.crop?.owner?.code_crop_owner,
      user: {
        document_id: project.crop?.owner?.user?.document_id,
        type_ide: project.crop?.owner?.user?.type_ide,
        type_user: project.crop?.owner?.user?.type_user,
        profile_picture: project.crop?.owner?.user?.profile_picture,
        name: project.crop?.owner?.user?.name,
        email: project.crop?.owner?.user?.email,
        phone: project.crop?.owner?.user?.phone,
        address: project.crop?.owner?.user?.address,
        date_of_birth: project.crop?.owner?.user?.date_of_birth,
        is_active: project.crop?.owner?.user?.is_active
      }
    }
  }


  private getInvesment(project: ProjectDto) {
    return {
      code_investment: project.invesment?.code_investment,
      estimated_rate: project.invesment?.estimated_rate,
      tir: project.invesment?.tir,
      minimum_investment_amount: project.invesment?.minimum_investment_amount,
      maximum_investment_amount: project.invesment?.maximum_investment_amount,
      total_expected_investment: project.invesment?.total_expected_investment,
      start_date: project.invesment?.start_date,
      end_date: project.invesment?.end_date
    }
  }

  private getPrePurcharse(project: ProjectDto) {
    return {
      units: project.pre_purcharse?.units,
      minimum_amount: project.pre_purcharse?.minimum_amount,
      maximum_amount: project.pre_purcharse?.maximum_amount,
      total_pre_purcharse: project.pre_purcharse?.total_pre_purcharse,
      start_date: project.pre_purcharse?.start_date,
      end_date: project.pre_purcharse?.end_date,
      unit_price: project.pre_purcharse?.unit_price
    }
  }
}
