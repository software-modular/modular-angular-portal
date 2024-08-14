import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { typeIdentificationOptions } from '../../utils/TypeIdentification';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  dynamicFormInput: DynamicFormInput;
  constructor(private formBuilder: FormBuilder) {

    this.dynamicFormInput = {
      title: "Perfil de usuario",
      titleAling: "left",
      fields: this.getFieldForm(),
      btnLabel: "Editar"
    }
  }

  private getFieldForm(): InputForm<any>[] {

    let fields: InputForm<any>[] = [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, "", []),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.TEXT, "", []),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "typeId", "",
        TypeInputForm.LIST_OPTION, typeIdentificationOptions, []),
      new TextFieldForm("Identificación", "Escribe tu identificación", "identification", "", TypeInputForm.TEXT, "", []),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, "", []),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, "", []),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "birthday", "", TypeInputForm.DATE, "", []),
    ];
    return fields;
  }

}
