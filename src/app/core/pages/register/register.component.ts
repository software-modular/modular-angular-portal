import { Component } from '@angular/core';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { typeIdentificationOptions } from '../../utils/TypeIdentification';
import { HiddenFieldForm } from '../../domain/beans/hiddenFieldForm';
import { UserResgisterData } from '../../domain/entity/UserRegister';
import { ClientRegisterData } from '../../domain/entity/ClientRegister';
import { TypeClient } from '../../domain/enum/TypeClient';

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

  disableBtnRegister() {
    return this.dynamicFormService.isValidForm();
  }

  register() {
    let formValue: UserResgisterData = JSON.parse(this.dynamicFormService.getJsonOfForm());
    let clientRegister: ClientRegisterData = {
      user: formValue
    }
    this.authenticationService.registerUser(clientRegister);
  }


  private getFieldsForm(): InputForm<any>[] {
    return [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, true, ""),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "type_ide", "",
        TypeInputForm.LIST_OPTION, true, typeIdentificationOptions),
      new TextFieldForm("Identificación", "Escribe tu identificación", "document_id", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE, true, ""),
      new HiddenFieldForm("", "", "is_active", "", TypeInputForm.HIDDEN, false, true),
      new TextFieldForm("", "", "profile_picture", "", TypeInputForm.HIDDEN, false, ""),
      new HiddenFieldForm("", "", "is_staff", "", TypeInputForm.HIDDEN, false, false),
      new TextFieldForm("", "", "type_user", "", TypeInputForm.HIDDEN, false, TypeClient.CLIENT),
    ];
  }


}
