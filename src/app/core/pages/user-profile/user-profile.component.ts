import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { typeIdentificationOptions } from '../../utils/TypeIdentification';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { ClientService } from '../../services/client/client.service';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  dynamicFormInput!: DynamicFormInput;
  userInfo!: ResponseClientDto;

  constructor(
    private dynamiFormService: DynamicFormService,
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.loadUserInfo()
  }


  private loadUserInfo() {
    this.userInfo = this.getUserInfo();
    this.loadDynamicForm(this.userInfo);
  }

  private loadDynamicForm(userInfo: ResponseClientDto) {
    this.dynamicFormInput = {
      title: "Perfil de usuario",
      titleAling: "left",
      fields: this.getFieldForm(this.userInfo),
      btnLabel: "Editar"
    }
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
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "birthday", "", TypeInputForm.DATE,
        userInfo.user.date_of_birth ?? '', []),
    ];
    return fields;
  }

}
