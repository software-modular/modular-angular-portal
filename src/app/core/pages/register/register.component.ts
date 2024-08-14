import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { HiddenFieldForm } from '../../domain/beans/hiddenFieldForm';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { ClientRegisterData } from '../../domain/entity/ClientRegister';
import { UserResgisterData } from '../../domain/entity/UserRegister';
import { TypeClient } from '../../domain/enum/TypeClient';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { typeIdentificationOptions } from '../../utils/TypeIdentification';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dynamicFormInput: DynamicFormInput;

  constructor(
    private dynamicFormService: DynamicFormService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private router: Router
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
    let showError = (title: string, message: string) => this.showMessageDialog(title, message, false);
    let userData = this.getClientRegisterData();
    this.authenticationService.registerUser(userData).subscribe({
      next: (data) => {
        this.showMessageDialog("Registro usuario", "Usuario creado", true)
      }, error(err) {
        showError("Registro usuario", `Ya existe un usuario con identificacion:${userData.user?.document_id}`);
      }
    });
  }
  showerr() { }

  getClientRegisterData(): ClientRegisterData {
    let formValue: UserResgisterData = JSON.parse(this.dynamicFormService.getJsonOfForm());
    formValue.date_of_birth = formValue.date_of_birth?.split("T")[0];
    let clientRegister: ClientRegisterData = {
      user: formValue
    }
    return clientRegister;
  }


  private getFieldsForm(): InputForm<any>[] {
    return [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, "", [Validators.required]),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.EMAIL, "", [Validators.required, Validators.email]),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, "", [Validators.required]),
      new ListOptionFieldForm("Tipo identificacion", "Escribe tipo identificacion", "type_ide", "",
        TypeInputForm.LIST_OPTION, typeIdentificationOptions, [Validators.required]),
      new TextFieldForm("Identificación", "Escribe tu identificación", "document_id", "", TypeInputForm.NUMBER, "", [Validators.required, Validators.minLength(7)]),
      new TextFieldForm("Telefono", "Escribe tu telefono", "phone", "", TypeInputForm.NUMBER, "", [Validators.required]),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, "", [Validators.required]),
      new TextFieldForm("Fecha nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE, "", [Validators.required]),
      new HiddenFieldForm("", "", "is_active", "", TypeInputForm.HIDDEN, true),
      new TextFieldForm("", "", "profile_picture", "", TypeInputForm.HIDDEN, "", []),
      new HiddenFieldForm("", "", "is_staff", "", TypeInputForm.HIDDEN, false),
      new TextFieldForm("", "", "type_user", "", TypeInputForm.HIDDEN, TypeClient.CLIENT, []),
    ];
  }

  showMessageDialog(titleHeader: string, message: string, redirect: Boolean) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
      accept: () => {
        if (redirect) {
          this.redirect('/portal/login')
        }
      }
    });
  }

  redirect(link: string) {
    this.router.navigate([link]);
  }

}
