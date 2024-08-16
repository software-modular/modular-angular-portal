import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { OptionInput } from '../../../core/domain/beans/OptionInput';
import { cities, countries, deparments } from '../../../core/domain/const/Colombia';
import { preOrderTypes } from '../../../core/domain/const/PreOrderTypes';
import { typeGrounds } from '../../../core/domain/const/TypeGround';
import { typeIdentifications } from '../../../core/domain/const/TypeIdentification';
import { ProjectDto } from '../../../core/domain/dto/projectDto';

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
        "/assets/img/carousel/img-carousel-not-found.svg",
      ]
    }


  @Output() saveProjectEvent = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
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

  eventSaveProject() {
    let project: ProjectDto = this.getProjectData();
    debugger
    this.saveProjectEvent.emit(project);
  }

  getProjectData(): ProjectDto {
    return {
      name: this.form.get("projectName")?.value,
      description: this.form.get("projectDescription")?.value,
      allow_prepurcharse: this.form.get("projectHasPrePurchase")?.value,
      crop: {
        country: this.form.get("cropCountry")?.value,
        department: this.form.get("cropDepartment")?.value,
        municipality: this.form.get("cropCity")?.value,
        address: this.form.get("cropAddress")?.value,
        type_of_ground: this.form.get("cropTypeGround")?.value,
        number_of_hectares: this.form.get("cropHetares")?.value,
        number_of_plants: this.form.get("cropNumberPlants")?.value,
        cultivation_start_date: this.getDateFormat(this.form.get("cropStartDate")?.value ?? ''),
        estimated_harvest_date: this.getDateFormat(this.form.get("cropEndDate")?.value ?? ''),
        owner: {
          wompi_public_key: this.form.get("wompiPublicKey")?.value,
          wompi_private_key: this.form.get("wompiSecretKey")?.value,
          user: {
            document_id: this.form.get("producerIdValue")?.value,
            type_ide: this.form.get("producerTypeId")?.value,
            type_user: this.form.get("producerTypeId")?.value,
            profile_picture: this.form.get("producerImgProfile")?.value,
            name: this.form.get("producerName")?.value,
            email: this.form.get("producerMail")?.value,
            phone: this.form.get("producerPhone")?.value,
            address: this.form.get("producerAddress")?.value,
            date_of_birth: this.getDateFormat(this.form.get("producerBirthday")?.value ?? ''),
            is_active: true
          }
        }
      },
      invesment: {
        estimated_rate: this.form.get("investmentRate")?.value,
        tir: this.form.get("investmentTir")?.value,
        minimum_investment_amount: this.form.get("investmentMinAmount")?.value,
        maximum_investment_amount: this.form.get("investmentMaxAmount")?.value,
        total_expected_investment: this.form.get("investmentTargetAmount")?.value,
        start_date: this.getDateFormat(this.form.get("investmentStartDate")?.value ?? ''),
        end_date: this.getDateFormat(this.form.get("investmentEndDate")?.value ?? ''),
      },
      pre_purcharse: {
        units: this.form.get("prePurchaseUnit")?.value,
        minimum_amount: this.form.get("prePurchaseMinAmount")?.value,
        maximum_amount: this.form.get("prePurchaseMaxAmount")?.value,
        start_date: this.getDateFormat(this.form.get("prePurchaseStartDate")?.value ?? ''),
        end_date: this.getDateFormat(this.form.get("prePurchaseEndDate")?.value ?? ''),
      },
      video_url: this.form.get("projectVideoUrl")?.value,
      photo_1: this.form.get("projectImgs")?.value, // Puedes ajustar estos valores según tus necesidades
      state: "ACT", // Puedes ajustar este valor según corresponda
      start_date: this.getDateFormat(this.form.get("projectStartDate")?.value ?? ''),
      end_date: this.getDateFormat(this.form.get("projectEndDate")?.value ?? '')
    }

  }

  private getDateFormat(date: string) {
    if (date !== undefined && date !== "") {
      return date.split("T")[0];
    }
    return "";
  }
}
