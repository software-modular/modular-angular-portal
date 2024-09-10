import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ResponseUserDto } from '../../../core/domain/dto/responseUserDto';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { UserService } from '../../../core/services/client/user.service';
import { NavbarService } from '../../../core/services/components/navbar.service';
import { convertFileToBase64 } from '../../../core/utils/FileUtils';
import { ResponseClientDto } from '../../../core/domain/dto/responseClientDto';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-agrapp-user-complete-information-modal',
  templateUrl: './agrapp-user-complete-information-modal.component.html',
  styleUrl: './agrapp-user-complete-information-modal.component.css'
})
export class AgrappUserCompleteInformationModalComponent {

  formFile: FormGroup;
  whatsappNumber: string = environment.aditionalInfo.whatsappNumber;
  filesAllow: string[] = ['application/docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  userInformation!: ResponseClientDto;
  showUploadContract: boolean = true

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private navbarService: NavbarService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgrappUserCompleteInformationModalComponent>) {
    this.formFile = this.formBuilder.group(
      {
        fileUpload: ["", [Validators.required]]
      }
    );
    this.userInformation = this.authenticationService.getUserInformation();
    if (!this.userInformation.status && this.userInformation.file_upload) {
      this.showUploadContract = false;
    }
  }

  closeModal() {
    this.navbarService.setUserInformation({});
    this.navbarService.showUserProfileMenu(false);
    this.navbarService.showLoginBtn(true);
    this.authenticationService.logoutUser();
    this.dialogRef.close()
  }

  async uploadDocument(event: any) {
    for (let file of event.target.files) {
      if (!this.filesAllow.includes(file.type)) {
        alert(`Formato de archivo no permitido, archivos permitidos: ${this.filesAllow}`);
        return
      }
    }
    let fileUpload = event.target.files[0];
    let result = confirm(`Desea subir el siguiente archivo: ${fileUpload.name}`);
    if (result) {
      this.userService.uploadContractUser(`${this.userInformation.code_client}`, fileUpload)
        .subscribe({
          next: (data) => {
            this.showMessageDialog("Carga contrato", "El contrato fue cargado exitosamente");
            this.showUploadContract = false;
          },
          error: (_) => {
            this.showMessageDialog("Carga contrato", "No fue posible cargar el contrato, contacte con el administrador");
          }
        });
    }
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  getWhatsappUrl(): string {
    return `https://wa.me/57${this.whatsappNumber}?text=${environment.aditionalInfo.whatsappDefaultMessage}`;
  }

  downloadAgreement() {
    let userInformation = this.authenticationService.getUserInformation();
    if (userInformation.mandate_contract) {
      this.userService.getAgreementUrl(`${userInformation.code_client}`).subscribe(
        {
          next: (data) => {
            window.open(data.pdf_url, "_blank");
          }
        }
      );
    }
  }

  private showMessageDialog(titleHeader: string, message: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
    });
  }
}
