import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { typeIdentifications } from '../../domain/const/TypeIdentification';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { UserService } from '../../services/client/user.service';
import { ResponseUserDto } from '../../domain/dto/responseUserDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { base64ToFile, convertImgToBase64 } from '../../utils/FileUtils';

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

  constructor(
    private dynamiFormService: DynamicFormService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private userService: UserService,

  ) {
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

  updateUserProfile() {
    if (this.userInfo.user.document_id !== undefined) {
      let userId = this.userInfo.user.document_id;
      let userUpdate: ResponseUserDto = this.getUserDataForm();
      this.userService.updateUser(this.getUserDataForm(), userId).subscribe({
        next: (_) => {
          this.showMessageDialog("Actualizacion de perfil", "Perfil actualizado")
          this.userInfo.user.name = userUpdate.name;
          this.userInfo.user.email = userUpdate.email;
          this.userInfo.user.date_of_birth = userUpdate.date_of_birth;
          this.userInfo.user.profile_picture = userUpdate.profile_picture;
          this.authenticationService.updateUserAuthenticated(this.userInfo);
          this.eventAfterUpdateProfile()
        },
        error: (_) => {
          this.showMessageDialog("Actualizacion de perfil", "No fue posible actualizar el perfil, intente mas tarde")
        }
      })
    }
  }

  getUserDataForm(): ResponseUserDto {
    return {
      name: this.dynamiFormService.getValueByFieldName("name"),
      email: this.dynamiFormService.getValueByFieldName("email"),
      profile_picture: this.imgProfileSource,
      address: this.dynamiFormService.getValueByFieldName("address"),
      date_of_birth: this.dynamiFormService.getValueByFieldName("date_of_birth")
    };
  }

  cancel() {
    this.editForm = false;
  }

  private getUserInfo(): ResponseClientDto {
    return this.authenticationService.getUserAuthenticated()
  }


  private getFieldForm(userInfo: ResponseClientDto): InputForm<any>[] {
    let fields: InputForm<any>[] = [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, userInfo.user.name ?? '', [Validators.required]),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.EMAIL, userInfo.user.email ?? '', [Validators.required]),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "typeId", "",
        TypeInputForm.LIST_OPTION, typeIdentifications, []),
      new TextFieldForm("Identificación", "Escribe tu identificación", "identification", "", TypeInputForm.TEXT,
        userInfo.user.document_id ?? '', []),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, userInfo.user.phone ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, userInfo.user.address ?? '', [Validators.required]),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE,
        userInfo.user.date_of_birth ?? '', [Validators.required]),
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


  async onFileSelected(event: any) {
    this.fileUpload = event.target.files[0];
    this.convertImageProfile();
  }

  async convertImageProfile() {
    this.imgProfileSource = await convertImgToBase64(this.fileUpload);
  }

}
