import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputForm } from '../../domain/beans/InputForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dynamicFormInput: DynamicFormInput;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dynamicFormService: DynamicFormService
  ) {
    this.registerForm = formBuilder.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    });

    this.dynamicFormInput = {
      title: "",
      titleAling: "left",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
  }

  private getFieldsForm(): InputForm<any>[] {
    let fields: InputForm<any>[] = [
      new TextFieldForm("Username", "Escribe tu identificacion", "identification", "", TypeInputForm.TEXT, true, ""),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, true, ""),
    ];
    return fields;
  }


}
