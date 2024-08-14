import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { ClientService } from '../../services/client/client.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { typeIdentificationOptions } from '../../utils/TypeIdentification';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  dynamicFormInput!: DynamicFormInput;
  userInfo!: ResponseClientDto;
  editForm: Boolean = false;

  constructor(
    private dynamiFormService: DynamicFormService,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
  ) {
    this.loadUserInfo()
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.disableFieldForm(true);
  }

  private loadUserInfo() {
    this.userInfo = this.getUserInfo();
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
    this.disableFieldForm(false);
  }

  updateUserProfile() {
    debugger
    this.showMessageDialog("Actualizacion de perfil", "Perfil actualizado")
    this.eventAfterUpdateProfile()
  }

  disableFieldForm(disable: Boolean) {
    this.dynamiFormService.disableFieldByFormControlName("name", disable);
    this.dynamiFormService.disableFieldByFormControlName("email", disable);
    this.dynamiFormService.disableFieldByFormControlName("typeId", disable);
    this.dynamiFormService.disableFieldByFormControlName("phone", disable);
    this.dynamiFormService.disableFieldByFormControlName("address", disable);
    this.dynamiFormService.disableFieldByFormControlName("identification", disable);
    this.dynamiFormService.disableFieldByFormControlName("date_of_birth", disable);
  }

  private getUserInfo(): ResponseClientDto {
    //se debe hacer peticion http para obtener la info del usuario{
    return {
      code_client: 10,
      user: {
        document_id: "36985274",
        type_ide: "CC",
        type_user: "CL",
        profile_picture: "",
        name: "test",
        email: "testt@gmail.com",
        phone: "3182665741",
        address: "carerras",
        date_of_birth: "2024-08-15",
        is_active: true
      }
    }
  }


  private getFieldForm(userInfo: ResponseClientDto): InputForm<any>[] {
    let fields: InputForm<any>[] = [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, userInfo.user.name ?? '', []),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.TEXT, userInfo.user.email ?? '', []),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "typeId", "",
        TypeInputForm.LIST_OPTION, typeIdentificationOptions, []),
      new TextFieldForm("Identificación", "Escribe tu identificación", "identification", "", TypeInputForm.TEXT,
        userInfo.user.document_id ?? '', []),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, userInfo.user.phone ?? '', []),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, userInfo.user.address ?? '', []),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE,
        userInfo.user.date_of_birth ?? '', []),
      new TextFieldForm("", "", "profile_picture", "", TypeInputForm.HIDDEN, "", []),
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
    this.disableFieldForm(true);
  }

}
