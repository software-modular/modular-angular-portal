import { Component } from '@angular/core';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { typeIdentificationOptions } from '../../utils/TypeIdentification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dynamicFormInput: DynamicFormInput;

  constructor(
    private dynamicFormService: DynamicFormService,
    private authenticationService: AuthenticationService
  ) {
    this.dynamicFormInput = {
      title: "Registro",
      titleAling: "center",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
  }

  register() {

  }


  private getFieldsForm(): InputForm<any>[] {
    return [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, true, ""),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "typeId", "",
        TypeInputForm.LIST_OPTION, true, typeIdentificationOptions),
      new TextFieldForm("Identificación", "Escribe tu identificación", "id", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE, true, ""),
    ];
  }


}
