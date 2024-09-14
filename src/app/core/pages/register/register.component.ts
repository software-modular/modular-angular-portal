import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { HiddenFieldForm } from '../../domain/beans/hiddenFieldForm';
import { InputForm } from '../../domain/beans/InputForm';
import { ListOptionFieldForm } from '../../domain/beans/ListOptioFieldForm';
import { TextFieldForm } from '../../domain/beans/textFieldForm';
import { cities } from '../../domain/const/Colombia';
import { typeIdentifications } from '../../domain/const/TypeIdentification';
import { ClientRegisterData } from '../../domain/entity/ClientRegister';
import { UserResgisterData } from '../../domain/entity/UserRegister';
import { TypeClient } from '../../domain/enum/TypeClient';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DynamicFormService } from '../../services/components/dynamic-form.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TermsModalComponent } from '../../../components/agrapp-modals/terms-modal/terms-modal.component';
import { emailValidator, maxLengthValidator, minLengthValidator, requiredValidator } from '../../domain/beans/dynamicValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dynamicFormInput: DynamicFormInput;
  form!: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.dynamicFormInput = {
      title: "Registro",
      titleAling: "center",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
    this.form = this.formBuilder.group({
      terms: [false]
    });
  }

  disableBtnRegister() {
    return this.dynamicFormService.isValidForm() && this.form.get('terms')?.value;
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

  showTerms() {
    let f = this.form.get('terms')?.value;
    this.openModal(TermsModalComponent);
  }


  private openModal(component: any, data?: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component);
    dialogRef.afterClosed().subscribe((_) => {
    });
  }


  private getClientRegisterData(): ClientRegisterData {
    let formValue: UserResgisterData = JSON.parse(this.dynamicFormService.getJsonOfForm());
    formValue.date_of_birth = formValue.date_of_birth?.split("T")[0];
    let clientRegister: ClientRegisterData = {
      user: formValue
    }
    return clientRegister;
  }


  private getFieldsForm(): InputForm<any>[] {
    return [
      new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, "", [requiredValidator()]),
      new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.EMAIL, "", [requiredValidator(), emailValidator()]),
      new TextFieldForm("Contraseña", "Escribe tu contraseña", "password", "", TypeInputForm.PASSWORD, "", [requiredValidator()]),
      new ListOptionFieldForm("Tipo de identificación", "Selecciona el tipo de identificación", "type_ide", "",
        TypeInputForm.LIST_OPTION, typeIdentifications, [requiredValidator()]),
      new TextFieldForm("Identificación", "Escribe tu identificación", "document_id", "", TypeInputForm.NUMBER, "", [requiredValidator(), minLengthValidator(7)]),
      new ListOptionFieldForm("Ciudad de expedición del documento", "Selecciona", "municipality_expedition_dni", "",
        TypeInputForm.LIST_OPTION, cities, [requiredValidator()]),
      new TextFieldForm("Teléfono", "Escribe tu teléfono", "phone", "", TypeInputForm.NUMBER, "", [requiredValidator(), minLengthValidator(10), maxLengthValidator(10)]),
      new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, "", [requiredValidator()]),
      new TextFieldForm("Fecha de nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE, "", [requiredValidator()]),
      new HiddenFieldForm("", "", "is_active", "", TypeInputForm.HIDDEN, true),
      new TextFieldForm("", "", "profile_picture", "", TypeInputForm.HIDDEN, "", []),
      new HiddenFieldForm("", "", "is_staff", "", TypeInputForm.HIDDEN, false),
      new TextFieldForm("", "", "type_user", "", TypeInputForm.HIDDEN, TypeClient.CLIENT, []),
    ];
  }


  private showMessageDialog(titleHeader: string, message: string, redirect: Boolean) {
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

  private redirect(link: string) {
    this.router.navigate([link]);
  }

}
