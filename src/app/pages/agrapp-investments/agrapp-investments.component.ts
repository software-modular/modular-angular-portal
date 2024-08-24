import { Component } from '@angular/core';
import { AgrappCardInput } from '../../core/domain/beans/agrappCardInput';
import { ProjectService } from '../../core/services/project/project.service';
import { projectList } from '../../core/domain/const/Mocks';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { getCityByCode, getDepartmentByCode } from '../../core/domain/const/Colombia';

@Component({
  selector: 'agrapp-investments',
  templateUrl: './agrapp-investments.component.html',
  styleUrl: './agrapp-investments.component.css'
})
export class AgrappInvestmentsComponent {
  constructor() {
  }

}
