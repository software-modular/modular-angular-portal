import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputForm } from '../../domain/beans/InputForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';

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
      title: "dd",
      titleAling: "left",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
  }

  register() {

  }

  private getFieldsForm(): InputForm<any>[] {
    let fields: InputForm<any>[] = [
      new TextFieldForm("Username", "Escribe tu identificacion", "identification", "", TypeInputForm.TEXT, "", []),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, "", []),
    ];
    return fields;
  }


}
