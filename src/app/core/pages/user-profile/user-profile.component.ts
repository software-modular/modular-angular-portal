import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.TEXT, true, ""),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "typeId", "",
        TypeInputForm.LIST_OPTION, true, typeIdentificationOptions),
      new TextFieldForm("Identificación", "Escribe tu identificación", "identification", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "birthday", "", TypeInputForm.DATE, true, ""),
    ];
    return fields;
  }

}
