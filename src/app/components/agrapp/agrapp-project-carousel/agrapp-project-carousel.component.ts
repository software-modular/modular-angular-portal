import { Component, Input, Output } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { ProjectService } from '../../../core/services/project/project.service';
import { ProjectDto } from '../../../core/domain/dto/projectDto';
import { getCityByCode, getDepartmentByCode } from '../../../core/domain/const/Colombia';
import { EventEmitter } from 'stream';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agrapp-project-carousel',
  templateUrl: './agrapp-project-carousel.component.html',
  styleUrl: './agrapp-project-carousel.component.css'
})
export class AgrappProjectCarouselComponent {

  projectsCard: AgrappCardInput[] = []


  responsiveOptions: any[] = [
    {
      breakpoint: '4000px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '1300px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '1100px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '870px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  constructor(private projectService: ProjectService,
    private router: Router
  ) {
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

  cardEvent(projectId: string) {
    this.router.navigate([`portal/project/info/${projectId}`])
  }

}
