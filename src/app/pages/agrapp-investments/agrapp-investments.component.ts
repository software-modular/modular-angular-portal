import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { AgrappCardInput } from '../../core/domain/beans/agrappCardInput';
import { getCityByCode, getDepartmentByCode } from '../../core/domain/const/Colombia';
import { Router } from '@angular/router';



@Component({
  selector: 'agrapp-investments',
  templateUrl: './agrapp-investments.component.html',
  styleUrl: './agrapp-investments.component.css'
})
export class AgrappInvestmentsComponent implements OnInit {


  projectsCard: AgrappCardInput[] = [];


  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getListProjects()
  }

  getListProjects() {
    this.projectService.findAllPublicProjects().subscribe({
      next: (data) => {
        let projects: ProjectDto[] = data.results;
        for (let project of projects) {
          this.projectsCard.push(this.getAgrappCardInput(project));
        }
      },
      error: (_) => {
        console.log("No se encontraron proyectos")
      }
    })
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
      id: `${project.code_project}`,
      state: project.state
    }
  }

  getImgsProject(projectData: ProjectDto): string[] {
    let cardFiles: string[] = [];
    if (projectData.photo_1 !== null && projectData.photo_1 !== undefined
      && projectData.photo_1 !== ""
    ) {
      cardFiles.push(projectData.photo_1);
    }
    if (projectData.photo_2 !== null && projectData.photo_2 !== undefined
      && projectData.photo_2 !== ""
    ) {
      cardFiles.push(projectData.photo_2);
    }
    if (projectData.photo_3 !== null && projectData.photo_3 !== undefined
      && projectData.photo_3 !== ""
    ) {
      cardFiles.push(projectData.photo_3);
    }
    if (projectData.photo_4 !== null && projectData.photo_4 !== undefined
      && projectData.photo_4 !== ""
    ) {
      cardFiles.push(projectData.photo_4)
    }
    if (projectData.photo_5 !== null && projectData.photo_5 !== undefined
      && projectData.photo_5 !== ""
    ) {
      cardFiles.push(projectData.photo_5)
    }
    return cardFiles;
  }

  cardEvent(projectId: string) {
    this.router.navigate([`portal/project/info/${projectId}`])
  }

  getStatus(code: string) {
    switch (code) {
      case "ACT": {
        return "Disponible"
      }
      case "FIN": {
        return "Finalizado"
      }
      case "INAC": {
        return "Inactivo"
      }
      default: {
        return "Disponible"
      }
    }
  }


  getProductsMini() {
    return Promise.resolve(this.projectsCard.slice(0, 5));
  }

  getProductsSmall() {
    return Promise.resolve(this.projectsCard.slice(0, 10));
  }

  getProducts() {
    return Promise.resolve(this.projectsCard);
  }

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.projectsCard.slice(0, 10));
  }

  getProductsWithOrders() {
    return Promise.resolve(this.projectsCard);
  }



}
