import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { InputForm } from '../../domain/beans/InputForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { NavbarService } from '../../services/components/navbar.service';
import { NabvarUserInformation } from '../../domain/beans/navbarUserInformation';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  dynamicFormInput: DynamicFormInput;
  userOrPasswordInvalid: Boolean = false;

  constructor(
    private dynamicFormService: DynamicFormService,
    private authenticationService: AuthenticationService,
    private nabvarService: NavbarService,
    private router: Router
  ) {
    this.dynamicFormInput = {
      title: "",
      titleAling: "left",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
  }

  login() {
    let identification = this.dynamicFormService.getValueByFieldName("identification");
    let password = this.dynamicFormService.getValueByFieldName("password");
    this.authenticationService.authenticateUser(identification, password)
      .then((data) => {
        debugger
        let userInformation: ResponseClientDto = data
        if (userInformation !== null) {
          let userInformationNabvar: NabvarUserInformation = {
            name: userInformation.user.name || '',
            username: userInformation.user.email || ''
          }
          this.nabvarService.setUserInformation(userInformationNabvar);
          this.nabvarService.showUserProfileMenu(true);
          this.nabvarService.setUserIsLogin(true);
          this.router.navigate(['']);
        }
      })
      .catch((err) => {
        this.userOrPasswordInvalid = true;
      });

  }

  enableBtnLogin(): Boolean {
    return this.dynamicFormService.isValidForm();
  }

  private getFieldsForm(): InputForm<any>[] {
    let fields: InputForm<any>[] = [
      new TextFieldForm("Identificacion", "Escribe tu identificacion", "identification", "", TypeInputForm.NUMBER, "", [Validators.required]),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, "", [Validators.required]),
    ];
    return fields;
  }


}
