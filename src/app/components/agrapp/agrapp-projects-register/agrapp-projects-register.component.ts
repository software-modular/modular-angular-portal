import { Component } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'agrapp-projects-register',
  templateUrl: './agrapp-projects-register.component.html',
  styleUrl: './agrapp-projects-register.component.css'
})
export class AgrappProjectsRegisterComponent {
  maxFormSteps: number = 2
  formStep: number = 1;
  projectForm: FormGroup;

  cardData: AgrappCardInput =
    {
      ownerName: "Juan Camilo Aranda",
      redirect: true,
      urlRedirect: "portal/login",
      nameCrop: "Cultivo Café",
      ubication: "Palmira - Valle",
      minInvestment: 200000,
      percentageProfit: "13%",
      investmentTarget: 5000000,
      partners: 1,
      funded: 200000,
      imgs: [
        "https://perfectdailygrind.com/es/wp-content/uploads/sites/2/2019/11/coffee-farm.jpg",
        "https://agrocode.com/wp-content/uploads/sites/2/2019/10/cultivo-cafe.jpg"
      ]
    }

  constructor(private formBuilder: FormBuilder) {
    this.projectForm = formBuilder.group({
      projectName: ["", [Validators.required]],
      ownerName: ["", [Validators.required]],
      location: ["", [Validators.required]],
      minInvestment: ["", [Validators.required]],
      percentageProfit: ["", [Validators.required]],
      target: ["", [Validators.required]],
    });
    this.projectForm.valueChanges.subscribe({
      next: (_) => {
        this.refreshCardData();
      }
    })
  }

  refreshCardData() {
    this.cardData.ownerName = this.projectForm.get("ownerName")?.value;
    this.cardData.nameCrop = this.projectForm.get("projectName")?.value
    this.cardData.ubication = this.projectForm.get("location")?.value;
    this.cardData.minInvestment = this.projectForm.get("minInvestment")?.value;
    this.cardData.percentageProfit = this.projectForm.get("percentageProfit")?.value;
    this.cardData.investmentTarget = this.projectForm.get("target")?.value;
  }

  changeStepForm(increase: boolean) {
    if (increase) {
      this.formStep += 1;
      return;
    }
    this.formStep -= 1;

  }
}
