import { Component } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { cities, countries, deparments } from '../../../core/domain/const/Colombia';
import { typeGrounds } from '../../../core/domain/const/TypeGround';
import { typeIdentifications } from '../../../core/domain/const/TypeIdentification';
import { OptionInput } from '../../../core/components/dto/OptionInput';
import { preOrderTypes } from '../../../core/domain/const/PreOrderTypes';

@Component({
  selector: 'agrapp-projects-register',
  templateUrl: './agrapp-projects-register.component.html',
  styleUrl: './agrapp-projects-register.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AgrappProjectsRegisterComponent {
  form: FormGroup;
  uploadedFiles: any[] = [];
  countryList = countries;
  deparmentList = deparments;
  cityList = cities;
  listTypeGround: OptionInput[] = typeGrounds;
  listTypeIdentification: OptionInput[] = typeIdentifications
  listTypePreOrders: OptionInput[] = preOrderTypes
  preOrderUnit: string = "KG"
  showPrePurchaseForm: boolean = false;

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
    this.form = formBuilder.group({
      projectName: ["", [Validators.required]],
      projectDescription: ["", [Validators.required]],
      projectHasPrePurchase: [false, [Validators.required]],
      projectStartDate: ["", [Validators.required]],
      projectEndDate: ["", [Validators.required]],
      projectImgs: ["", [Validators.required]],
      projectVideoUrl: ["", [Validators.required]],
      cropCountry: ["", [Validators.required]],
      cropDepartment: ["", [Validators.required]],
      cropCity: ["", [Validators.required]],
      cropAddress: ["", [Validators.required]],
      cropTypeGround: ["", [Validators.required]],
      cropHetares: ["", [Validators.required]],
      cropNumberPlants: ["", [Validators.required]],
      cropStartDate: ["", [Validators.required]],
      cropEndDate: ["", [Validators.required]],
      producerTypeId: ["", [Validators.required]],
      producerIdValue: ["", [Validators.required]],
      producerName: ["", [Validators.required]],
      producerMail: ["", [Validators.required]],
      producerPhone: ["", [Validators.required]],
      producerAddress: ["", [Validators.required]],
      producerBirthday: ["", [Validators.required]],
      producerImgProfile: ["", [Validators.required]],
      investmentRate: ["", [Validators.required]],
      investmentTir: ["", [Validators.required]],
      investmentMinAmount: ["", [Validators.required]],
      investmentMaxAmount: ["", [Validators.required]],
      investmentTargetAmount: ["", [Validators.required]],
      investmentStartDate: ["", [Validators.required]],
      investmentEndDate: ["", [Validators.required]],
      prePurchaseUnit: ["", [Validators.required]],
      prePurchaseMinAmount: ["", [Validators.required]],
      prePurchaseMaxAmount: ["", [Validators.required]],
      prePurchaseStartDate: ["", [Validators.required]],
      prePurchaseEndDate: ["", [Validators.required]],
      wompiPublicKey: ["", [Validators.required]],
      wompiSecretKey: ["", [Validators.required]],
    });
    this.onChangeFormValues();
  }

  refreshCardData() {
    this.cardData.ownerName = this.form.get("projectName")?.value;
    this.cardData.nameCrop = this.form.get("projectName")?.value
    this.cardData.imgs = this.getImgOfFiles(this.form.get("projectImgs")?.value);
    let hasPrepurchase = this.form.get("projectHasPrePurchase")?.value
    this.showPrePurchaseForm = hasPrepurchase === "true" ? true : false;
  }


  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  getImgOfFiles(files: any[]) {
    let imgs: string[] = []
    for (let file of files) {
      imgs.push(file.objectURL.changingThisBreaksApplicationSecurity);
    }
    return imgs;
  }

  onChangeFormValues() {
    this.form.valueChanges.subscribe({
      next: (_) => {
        this.refreshCardData();
      }
    })
  }
}
