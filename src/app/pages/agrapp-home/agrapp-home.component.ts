import { Component } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { getCityByCode, getDepartmentByCode } from '../../core/domain/const/Colombia';
import { AgrappCardInput } from '../../core/domain/beans/agrappCardInput';
import { projectList } from '../../core/domain/const/Mocks';

@Component({
  selector: 'agrapp-home',
  templateUrl: './agrapp-home.component.html',
  styleUrl: './agrapp-home.component.css'
})
export class AgrappHomeComponent {
  projectsCard: AgrappCardInput[] = []

  constructor(private projectService: ProjectService) {
    this.getListProjects()
  }


  getListProjects() {
    //peticion para consultar proyectos
    let projects: AgrappCardInput[] = [];
    for (let project of projectList) {
      projects.push(this.getAgrappCardInput(project));
    }
    this.projectsCard = projects;

  }

  getAgrappCardInput(project: ProjectDto): AgrappCardInput {
    return {
      ownerName: project.crop?.owner?.user?.name ?? '',
      nameCrop: project.name ?? '',
      partners: 2,
      ubication: `${getCityByCode(project.crop?.municipality ?? '')} - ${getDepartmentByCode(project.crop?.department ?? '')}`,
      investmentTarget: Number(project.invesment?.maximum_investment_amount) ?? 0,
      minInvestment: Number(project.invesment?.minimum_investment_amount) ?? 0,
      percentageProfit: `${project.invesment?.estimated_rate}%`,
      funded: 500000,
      imgs: this.getImgsProject(project),
      redirect: true,
      id: `${project.code_project}`
    }
  }

  getImgsProject(project: ProjectDto): string[] {
    return [
      project.photo_1 ?? '',
      project.photo_2 ?? '',
      project.photo_3 ?? '',
      project.photo_4 ?? '',
      project.photo_5 ?? ''
    ];
  }

}
