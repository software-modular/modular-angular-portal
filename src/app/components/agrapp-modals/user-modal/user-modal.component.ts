import { AfterViewInit, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormInput } from '../../../core/domain/beans/dynamicFormInput';
import { HiddenFieldForm } from '../../../core/domain/beans/hiddenFieldForm';
import { InputForm } from '../../../core/domain/beans/InputForm';
import { ListOptionFieldForm } from '../../../core/domain/beans/ListOptioFieldForm';
import { OptionInput } from '../../../core/domain/beans/OptionInput';
import { TextFieldForm } from '../../../core/domain/beans/textFieldForm';
import { typeIdentifications } from '../../../core/domain/const/TypeIdentification';
import { ClientRegisterData } from '../../../core/domain/entity/ClientRegister';
import { UserResgisterData } from '../../../core/domain/entity/UserRegister';
import { TypeInputForm } from '../../../core/domain/enum/TypeInputForm';
import { TypeModalMode } from '../../../core/domain/enum/TypeModalMode';
import { UserService } from '../../../core/services/client/user.service';
import { DynamicFormService } from '../../../core/services/components/dynamic-form.service';
import { InputUserModal } from '../../../core/domain/beans/inputUserModal';
import { cities } from '../../../core/domain/const/Colombia';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { DynamicValidator, emailValidator, maxLengthValidator, minLengthValidator, requiredValidator } from '../../../core/domain/beans/dynamicValidator';
import { TypeDynamicValidator } from '../../../core/domain/enum/typeDynamicValidators';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent implements AfterViewInit {

  modalTitle: string = "Usuario"
  dynamicFormInput!: DynamicFormInput;

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    private dynamicFormService: DynamicFormService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: InputUserModal
  ) {
    this.loadForm();
  }


  ngAfterViewInit(): void {
    this.loadFormData();
    this.loadMode();
  }


  loadForm() {
    this.dynamicFormInput = {
      title: "Datos usuario",
      titleAling: "center",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
  }

  loadFormData() {
    if (this.data != undefined) {
      this.dynamicFormService.setValueField("name", this.data.data.name);
      this.dynamicFormService.setValueField("email", this.data.data.email);
      this.dynamicFormService.setValueField("type_ide", this.data.data.type_ide);
      this.dynamicFormService.setValueField("document_id", this.data.data.document_id);
      this.dynamicFormService.setValueField("phone", this.data.data.phone);
      this.dynamicFormService.setValueField("address", this.data.data.address);
      this.dynamicFormService.setValueField("date_of_birth", this.data.data.date_of_birth);
      this.dynamicFormService.setValueField("type_user", this.data.data.type_user);
      this.dynamicFormService.setValueField("municipality_expedition_dni", this.data.data.municipality_expedition_dni);
    }
  }

  loadMode() {
    if (this.data !== undefined && TypeModalMode.VIEW === this.data.mode) {
      this.modalTitle = "Usuario"
      this.disableFieldsForm(true);
    } else {
      this.modalTitle = "Crear usuario";
      this.disableFieldsForm(false);
    }

  }

  private getFieldsForm(): InputForm<any>[] {
    let typeUsers: OptionInput[] = [
      {
        label: "Administrador",
        value: "ST"
      },
      {
        label: "Cliente",
        value: "CL"
      },
    ];
    let listField: InputForm<any>[] = [];
    listField.push(new TextFieldForm("Nombre", "Escribe tu nombre", "name", "", TypeInputForm.TEXT, '', [requiredValidator()]));
    listField.push(new TextFieldForm("Correo", "Escribe tu correo", "email", "", TypeInputForm.EMAIL, '', [requiredValidator(), emailValidator()]));
    if (this.data === undefined) {
      listField.push(new TextFieldForm("Contraseña", "", "password", "", TypeInputForm.PASSWORD, '', [requiredValidator()]));
    }
    listField.push(new ListOptionFieldForm("Tipo de usuario", "Seleccione", "type_user", "", TypeInputForm.LIST_OPTION, typeUsers, []));
    listField.push(new ListOptionFieldForm("Tipo de identificación", "Seleccione", "type_ide", "",
      TypeInputForm.LIST_OPTION, typeIdentifications, [requiredValidator()]));
    listField.push(new TextFieldForm("Identificación", "Escribe tu identificación", "document_id", "", TypeInputForm.NUMBER, '',
      [requiredValidator(), minLengthValidator(7)]));
    listField.push(new ListOptionFieldForm("Ciudad de expedición del documento", "Seleccione", "municipality_expedition_dni", "",
      TypeInputForm.LIST_OPTION, cities, [requiredValidator()]));
    listField.push(new TextFieldForm("Teléfono", "Escribe tu teléfono", "phone", "", TypeInputForm.NUMBER, '',
      [requiredValidator(), minLengthValidator(10), maxLengthValidator(10)]));
    listField.push(new TextFieldForm("Dirección", "Escribe tu dirección", "address", "", TypeInputForm.TEXT, '', [requiredValidator()]));
    listField.push(new TextFieldForm("Fecha de nacimiento", "Escribe tu fecha de nacimiento", "date_of_birth", "", TypeInputForm.DATE, '', [requiredValidator()]));
    listField.push(new HiddenFieldForm("", "", "is_active", "", TypeInputForm.HIDDEN, true));
    listField.push(new TextFieldForm("", "", "profile_picture", "", TypeInputForm.HIDDEN, "", []));
    listField.push(new HiddenFieldForm("", "", "is_staff", "", TypeInputForm.HIDDEN, false));
    return listField;
  }



  disableFieldsForm(disable: Boolean) {
    this.dynamicFormService.disableFieldByFormControlName("name", disable);
    this.dynamicFormService.disableFieldByFormControlName("email", disable);
    this.dynamicFormService.disableFieldByFormControlName("type_ide", disable);
    this.dynamicFormService.disableFieldByFormControlName("phone", disable);
    this.dynamicFormService.disableFieldByFormControlName("address", disable);
    this.dynamicFormService.disableFieldByFormControlName("document_id", disable);
    this.dynamicFormService.disableFieldByFormControlName("date_of_birth", disable);
    this.dynamicFormService.disableFieldByFormControlName("type_user", disable);
    this.dynamicFormService.disableFieldByFormControlName("municipality_expedition_dni", disable);
  }

  closeModal() {
    this.dialogRef.close()
  }

  disableSaveButton() {
    return !this.dynamicFormService.isValidForm();
  }

  save() {
    let showError = (title: string, message: string) => this.showMessageDialog(title, message);
    let userData = this.getClientRegisterData();
    if (userData.user?.type_user === "ST") {
      this.userService.createStaff(userData).subscribe({
        next: (data) => {
          this.showMessageDialog("Registro usuario", "Usuario creado")
        }, error(err) {
          showError("Registro usuario", `Ya existe un usuario con identificacion:${userData.user?.document_id}`);
        }
      });
    } else {
      this.authenticationService.registerUser(userData).subscribe({
        next: (_) => {
          this.showMessageDialog("Registro usuario", "Usuario creado")
        },
        error: (_) => {
          showError("Registro usuario", `Ya existe un usuario con identificacion:${userData.user?.document_id}`);
        }
      });
    }


  }



  private getClientRegisterData(): ClientRegisterData {
    let formValue: UserResgisterData = JSON.parse(this.dynamicFormService.getJsonOfForm());
    formValue.date_of_birth = formValue.date_of_birth?.split("T")[0];
    let clientRegister: ClientRegisterData = {
      user: formValue
    }
    if (formValue.type_user === "ST") {
      clientRegister.ocupation_staff = 1;
    }


    return clientRegister;
  }


  private showMessageDialog(titleHeader: string, message: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
      accept: () => {
        this.closeModal();
      }
    });
  }

}
