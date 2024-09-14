import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { typeIdentifications } from '../../domain/const/TypeIdentification';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { ResponseUserDto } from '../../domain/dto/responseUserDto';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/client/user.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { convertFileToBase64 } from '../../utils/FileUtils';
import { cities } from '../../domain/const/Colombia';
import { maxLengthValidator, minLengthValidator, requiredValidator } from '../../domain/beans/dynamicValidator';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  dynamicFormInput!: DynamicFormInput;
  userInfo!: ResponseClientDto;
  editForm: Boolean = false;
  imgProfileSource: string = "assets/img/profile/user-profile-default.png";
  fileUpload: any;
  imgForm: FormGroup;
  filesAllow: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private dynamiFormService: DynamicFormService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.imgForm = this.formBuilder.group({
      file: [""]
    });
    this.loadUserInfo()
  }

  ngOnInit(): void {
  }

  private loadUserInfo() {
    this.userInfo = this.getUserInfo();
    if (this.userInfo.user.profile_picture !== undefined && this.userInfo.user.profile_picture !== "") {
      this.imgProfileSource = this.userInfo.user.profile_picture;
    }
    this.loadDynamicForm(this.userInfo);
  }

  private loadDynamicForm(userInfo: ResponseClientDto) {
    this.dynamicFormInput = {
      title: "",
      titleAling: "left",
      fields: this.getFieldForm(this.userInfo),
      btnLabel: "Editar"
    }
    this.dynamiFormService.setValueField("typeId", userInfo.user.type_ide);
  }

  editFormProcess() {
    this.editForm = true;
  }

  async updateUserProfile() {
    if (this.userInfo.user.type_user === "ST") {
      if (this.userInfo.code_staff !== undefined) {
        let userId = this.userInfo.code_staff;
        let userUpdate: ResponseUserDto = await this.getUserDataForm();
        this.userService.updateStaff(userUpdate, `${userId}`).subscribe({
          next: (_) => {
            this.updateUserInfo(userUpdate);
            this.showMessageDialog("Actualizacion de perfil", "Perfil actualizado")
            this.eventAfterUpdateProfile()
          },
          error: (_) => {
            this.showMessageDialog("Actualizacion de perfil", "No fue posible actualizar el perfil, intente mas tarde")
          }
        })
      }
    } else {
      if (this.userInfo.code_client !== undefined) {
        let userId = this.userInfo.code_client;
        let userUpdate: ResponseUserDto = await this.getUserDataForm();
        this.userService.updateClient(userUpdate, `${userId}`).subscribe({
          next: (_) => {
            this.updateUserInfo(userUpdate);
            this.showMessageDialog("Actualizacion de perfil", "Perfil actualizado")
            this.eventAfterUpdateProfile()
          },
          error: (_) => {
            this.showMessageDialog("Actualizacion de perfil", "No fue posible actualizar el perfil, intente mas tarde")
          }
        })
      }
    }
  }

  updateUserInfo(userUpdate: ResponseUserDto) {
    this.userInfo.user.name = userUpdate.name;
    this.userInfo.user.email = userUpdate.email;
    this.userInfo.user.date_of_birth = userUpdate.date_of_birth;
    this.userInfo.user.profile_picture = userUpdate.profile_picture;
    this.authenticationService.updateUserAuthenticated(this.userInfo);
  }

  async getUserDataForm() {
    let user: ResponseUserDto = {
      name: this.dynamiFormService.getValueByFieldName("name"),
      email: this.dynamiFormService.getValueByFieldName("email"),
      profile_picture: this.imgProfileSource,
      address: this.dynamiFormService.getValueByFieldName("address"),
      date_of_birth: this.dynamiFormService.getValueByFieldName("date_of_birth"),
      phone: this.dynamiFormService.getValueByFieldName("phone"),
      municipality_expedition_dni: this.dynamiFormService.getValueByFieldName("municipality_expedition_dni"),
    };
    if (this.imgForm.get("file")?.value !== null
      && this.imgForm.get("file")?.value !== undefined
      && this.imgForm.get("file")?.value !== '') {
      user.profile_picture = await convertFileToBase64(this.fileUpload);
    }
    return user;
  }


  isValidForm() {
    return this.dynamiFormService.isValidForm();
  }


  async onFileSelected(event: any) {
    for (let file of event.target.files) {
      if (!this.filesAllow.includes(file.type)) {
        alert(`Formato de archivo no permitido, archivos permitidos: ${this.filesAllow}`);
        return
      }
    }
    this.fileUpload = event.target.files[0];
    this.convertImageProfile();
  }

  async convertImageProfile() {
    this.imgProfileSource = await convertFileToBase64(this.fileUpload);
  }

  private getUserInfo(): ResponseClientDto {
    return this.authenticationService.getUserInformation()
  }


  private getFieldForm(userInfo: ResponseClientDto): InputForm<any>[] {
    let fields: InputForm<any>[] = [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, userInfo.user.name ?? '', [requiredValidator()]),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.EMAIL, userInfo.user.email ?? '', [requiredValidator()]),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "typeId", "",
        TypeInputForm.LIST_OPTION, typeIdentifications, []),
      new TextFieldForm("Identificación", "Escribe tu identificación", "identification", "", TypeInputForm.TEXT,
        userInfo.user.document_id ?? '', []),
      new ListOptionFieldForm("Ciudad expedición documento", "Seleccione", "municipality_expedition_dni", "",
        TypeInputForm.LIST_OPTION, cities, [requiredValidator()]),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, userInfo.user.phone ?? '',
        [requiredValidator(), minLengthValidator(10), maxLengthValidator(10)]),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, userInfo.user.address ?? '', [requiredValidator()]),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE,
        userInfo.user.date_of_birth ?? '', [requiredValidator()]),
    ];
    return fields;
  }


  private showMessageDialog(titleHeader: string, message: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
    });
  }

  private eventAfterUpdateProfile() {
    this.editForm = false;
  }

}
