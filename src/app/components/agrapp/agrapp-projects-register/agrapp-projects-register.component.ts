import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { OptionInput } from '../../../core/domain/beans/OptionInput';
import { cities, countries, deparments, getCityByCode, getDepartmentByCode } from '../../../core/domain/const/Colombia';
import { preOrderTypes } from '../../../core/domain/const/PreOrderTypes';
import { typeGrounds } from '../../../core/domain/const/TypeGround';
import { typeIdentifications } from '../../../core/domain/const/TypeIdentification';
import { ProjectDto } from '../../../core/domain/dto/projectDto';
import { formatServerDate, stringDateToFormatServerDate } from '../../../core/utils/Date';
import { statesProject } from '../../../core/domain/const/StateProject';
import { ActivatedRoute } from '@angular/router';
import { projectList } from '../../../core/domain/const/Mocks';
import { ProjectService } from '../../../core/services/project/project.service';
import { base64ToFile } from '../../../core/utils/FileUtils';

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
export class AgrappProjectsRegisterComponent implements AfterViewInit, OnInit {
  form: FormGroup;
  uploadedFiles: any[] = [];
  stateProjectList: OptionInput[] = statesProject;
  countryList: OptionInput[] = countries;
  deparmentList: OptionInput[] = deparments;
  cityList: OptionInput[] = cities;
  listTypeGround: OptionInput[] = typeGrounds;
  listTypeIdentification: OptionInput[] = typeIdentifications
  listTypePreOrders: OptionInput[] = preOrderTypes
  preOrderUnit: string = "KG"
  showPrePurchaseForm: boolean = false;

  idProject: Number = 0;
  isEdit: Boolean = false;
  projectData: ProjectDto = {}


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
      ],
      id: "carousel"
    }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,) {
    this.idProject = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.formBuilder.group({
      projectName: ["", [Validators.required]],
      projectDescription: ["", [Validators.required]],
      projectHasPrePurchase: [false, [Validators.required]],
      projectStartDate: ["", [Validators.required]],
      projectEndDate: ["", [Validators.required]],
      projectImgs: ["", []],
      projectVideoUrl: ["", []],
      projectState: ["", [Validators.required]],
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
      producerIdValue: ["", [Validators.required, Validators.minLength(7)]],
      producerName: ["", [Validators.required]],
      producerMail: ["", [Validators.required]],
      producerPhone: ["", [Validators.required, Validators.minLength(10)]],
      producerAddress: ["", [Validators.required]],
      producerBirthday: ["", [Validators.required]],
      producerImgProfile: ["", []],
      investmentRate: ["", [Validators.required]],
      investmentTir: ["", [Validators.required]],
      investmentMinAmount: ["", [Validators.required]],
      investmentMaxAmount: ["", [Validators.required]],
      investmentTargetAmount: ["", [Validators.required]],
      investmentStartDate: ["", [Validators.required]],
      investmentEndDate: ["", [Validators.required]],
      prePurchaseUnit: ["", []],
      prePurchaseMinAmount: ["", []],
      prePurchaseMaxAmount: ["", []],
      prePurchaseStartDate: ["", []],
      prePurchaseEndDate: ["", []],
      wompiPublicKey: ["", []],
      wompiSecretKey: ["", []],
    });
    this.onChangeFormValues();
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.idProject) {
      this.isEdit = true; //peticion http para pedir la info del proyecto
      this.projectData = projectList.find(project => project.code_project === this.idProject) ?? {};
      this.loadFormEdit(this.projectData);
    }
  }



  loadFormEdit(projectDto: ProjectDto) {
    this.form.get("projectName")?.setValue(projectDto.name ?? '');
    this.form.get("projectDescription")?.setValue(projectDto.description ?? '');
    this.form.get("projectHasPrePurchase")?.setValue(projectDto.allow_prepurcharse ?? false);
    this.form.get("projectStartDate")?.setValue(projectDto.start_date ?? '');
    this.form.get("projectEndDate")?.setValue(projectDto.end_date ?? '');
    this.form.get("projectImgs")?.setValue("");// convertir a lista de imagenes
    this.form.get("projectVideoUrl")?.setValue(projectDto.video_url ?? '');
    this.form.get("projectState")?.setValue(projectDto.state ?? '');
    this.form.get("cropCountry")?.setValue(projectDto.crop?.country ?? '');
    this.form.get("cropDepartment")?.setValue(projectDto.crop?.department ?? '');
    this.form.get("cropCity")?.setValue(projectDto.crop?.municipality ?? '');
    this.form.get("cropAddress")?.setValue(projectDto.crop?.address ?? '');
    this.form.get("cropTypeGround")?.setValue(projectDto.crop?.type_of_ground ?? '');
    this.form.get("cropHetares")?.setValue(projectDto.crop?.number_of_hectares ?? '');
    this.form.get("cropNumberPlants")?.setValue(projectDto.crop?.number_of_plants ?? '');
    this.form.get("cropStartDate")?.setValue(projectDto.crop?.cultivation_start_date ?? '');
    this.form.get("cropEndDate")?.setValue(projectDto.crop?.estimated_harvest_date ?? '');
    this.form.get("producerTypeId")?.setValue(projectDto.crop?.owner?.user?.type_ide ?? '');
    this.form.get("producerIdValue")?.setValue(projectDto.crop?.owner?.user?.document_id ?? '');
    this.form.get("producerName")?.setValue(projectDto.crop?.owner?.user?.name ?? '');
    this.form.get("producerMail")?.setValue(projectDto.crop?.owner?.user?.email ?? '');
    this.form.get("producerPhone")?.setValue(projectDto.crop?.owner?.user?.phone ?? '');
    this.form.get("producerAddress")?.setValue(projectDto.crop?.owner?.user?.address ?? '');
    this.form.get("producerBirthday")?.setValue(projectDto.crop?.owner?.user?.date_of_birth ?? '');
    this.form.get("investmentRate")?.setValue(projectDto.invesment?.estimated_rate ?? '');
    this.form.get("investmentTir")?.setValue(projectDto.invesment?.estimated_rate ?? '');
    this.form.get("investmentMinAmount")?.setValue(projectDto.invesment?.minimum_investment_amount ?? '');
    this.form.get("investmentMaxAmount")?.setValue(projectDto.invesment?.maximum_investment_amount ?? '');
    this.form.get("investmentTargetAmount")?.setValue(projectDto.invesment?.total_expected_investment ?? '');
    this.form.get("investmentStartDate")?.setValue(projectDto.invesment?.start_date ?? '');
    this.form.get("investmentEndDate")?.setValue(projectDto.invesment?.end_date ?? '');
    this.form.get("prePurchaseUnit")?.setValue(projectDto.pre_purcharse?.units ?? '');
    this.form.get("prePurchaseMinAmount")?.setValue(projectDto.pre_purcharse?.minimum_amount ?? '');
    this.form.get("prePurchaseMaxAmount")?.setValue(projectDto.pre_purcharse?.maximum_amount ?? '');
    this.form.get("prePurchaseStartDate")?.setValue(projectDto.pre_purcharse?.start_date ?? '');
    this.form.get("prePurchaseEndDate")?.setValue(projectDto.pre_purcharse?.end_date ?? '');
    this.form.get("wompiPublicKey")?.setValue(projectDto.crop?.owner?.wompi_public_key ?? '');
    this.form.get("wompiSecretKey")?.setValue(projectDto.crop?.owner?.wompi_private_key ?? '');
  }

  refreshCardData() {
    this.cardData.nameCrop = this.form.get("projectName")?.value;
    this.cardData.ownerName = this.form.get("producerName")?.value;
    this.cardData.imgs = this.getImgOfFiles(this.form.get("projectImgs")?.value);
    this.cardData.ubication = `${getCityByCode(this.form.get("cropCity")?.value)} - ${getDepartmentByCode(this.form.get("cropDepartment")?.value)}`
    this.cardData.investmentTarget = this.form.get("investmentTargetAmount")?.value;
    this.cardData.minInvestment = this.form.get("investmentMinAmount")?.value;
    this.cardData.percentageProfit = this.form.get("investmentRate")?.value;
    if (this.isEdit) {
      this.cardData.imgs = this.getCardImgs();

    }
    let hasPrepurchase = this.form.get("projectHasPrePurchase")?.value
    this.showPrePurchaseForm = hasPrepurchase === "true" ? true : false;
  }

  getCardImgs(): string[] {
    let cardFiles: string[] = [];
    cardFiles.push(this.projectData.photo_1 ?? '')
    cardFiles.push(this.projectData.photo_2 ?? '')
    cardFiles.push(this.projectData.photo_3 ?? '')
    cardFiles.push(this.projectData.photo_4 ?? '')
    cardFiles.push(this.projectData.photo_5 ?? '')
    return cardFiles;
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

  saveProject() {
    this.eventSaveProject();
  }

  async eventSaveProject() {
    debugger
    let project: ProjectDto = await this.getProjectData();
    this.projectService.createProject(project).subscribe({
      next: (response) => {
        let pp = "";
      },
      error: (err) => {
        let pp = "";
      }
    })
  }


  async getProjectData() {
    let formData: ProjectDto = {
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
          user: {
            document_id: this.form.get("producerIdValue")?.value,
            type_ide: this.form.get("producerTypeId")?.value,
            type_user: "CO",
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
      video_url: this.form.get("projectVideoUrl")?.value,
      state: this.form.get("projectState")?.value,
      start_date: this.getDateFormat(this.form.get("projectStartDate")?.value ?? ''),
      end_date: this.getDateFormat(this.form.get("projectEndDate")?.value ?? '')
    }
    let projectImgs: File[] = this.form.get("projectImgs")?.value;
    if (projectImgs !== undefined && projectImgs.length > 0) {
      for (let i = 0; i < projectImgs.length; i++) {
        if (i == 0) {
          formData.photo_1 = await this.convertImgToBase64(projectImgs[i]);
        }
        if (i == 1) {
          formData.photo_2 = await this.convertImgToBase64(projectImgs[i]);
        }
        if (i == 2) {
          formData.photo_3 = await this.convertImgToBase64(projectImgs[i]);
        }
        if (i == 3) {
          formData.photo_4 = await this.convertImgToBase64(projectImgs[i]);
        }
        if (i == 4) {
          formData.photo_5 = await this.convertImgToBase64(projectImgs[i]);
        }
      }
    }
    formData.photo_1 = formData.photo_1 !== undefined && formData.photo_1 !== '' ? formData.photo_1 : '';
    formData.photo_2 = formData.photo_2 !== undefined && formData.photo_2 !== '' ? formData.photo_2 : '';
    formData.photo_3 = formData.photo_3 !== undefined && formData.photo_3 !== '' ? formData.photo_3 : '';
    formData.photo_4 = formData.photo_4 !== undefined && formData.photo_4 !== '' ? formData.photo_4 : '';
    formData.photo_5 = formData.photo_5 !== undefined && formData.photo_5 !== '' ? formData.photo_5 : '';

    let imgProducer: File[] = this.form.get("producerImgProfile")?.value;
    if (imgProducer !== undefined && imgProducer.length > 0) {
      if (formData.crop !== undefined && formData.crop.owner !== undefined
        && formData.crop.owner?.user !== undefined) {
        if (formData.crop.owner.user.profile_picture !== undefined) {
          formData.crop.owner.user.profile_picture = await this.convertImgToBase64(imgProducer[0]);
        } else {
          formData.crop.owner.user.profile_picture = "";
        }
      }
    }
    /*formData.pre_purcharse = {
      units: this.form.get("prePurchaseUnit")?.value ?? 0,
      minimum_amount: this.form.get("prePurchaseMinAmount")?.value ?? 0,
      maximum_amount: this.form.get("prePurchaseMaxAmount")?.value ?? 0,
      start_date: this.getDateFormat(this.form.get("prePurchaseStartDate")?.value ?? '') ?? formatServerDate(new Date()).split("T")[0],
      end_date: this.getDateFormat(this.form.get("prePurchaseEndDate")?.value ?? formatServerDate(new Date()).split("T")[0]),
    }*/
    return formData
  }

  private getDateFormat(date: string) {
    if (date !== undefined && date !== "") {
      return stringDateToFormatServerDate(date).split("T")[0];
    }
    return "";
  }

  convertImgToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

}
