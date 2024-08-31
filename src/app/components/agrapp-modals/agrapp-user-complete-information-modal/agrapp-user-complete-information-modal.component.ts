import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../../core/services/components/navbar.service';
import { UserService } from '../../../core/services/client/user.service';
import { ResponseUserDto } from '../../../core/domain/dto/responseUserDto';
import { downloadFile } from '../../../core/utils/FileUtils';

@Component({
  selector: 'app-agrapp-user-complete-information-modal',
  templateUrl: './agrapp-user-complete-information-modal.component.html',
  styleUrl: './agrapp-user-complete-information-modal.component.css'
})
export class AgrappUserCompleteInformationModalComponent {

  formFile: FormGroup;
  whatsappNumber: string = environment.aditionalInfo.whatsappNumber;
  filesAllow: string[] = ['application/pdf'];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private navbarService: NavbarService,
    private userService: UserService,
    public dialogRef: MatDialogRef<AgrappUserCompleteInformationModalComponent>) {
    this.formFile = this.formBuilder.group(
      {
        fileUpload: ["", [Validators.required]]
      }
    );
  }

  closeModal() {
    this.navbarService.setUserInformation({});
    this.navbarService.showUserProfileMenu(false);
    this.navbarService.showLoginBtn(true);
    this.authenticationService.logoutUser();
    this.dialogRef.close()
  }

  uploadDocument(event: any) {
    for (let file of event.target.files) {
      if (!this.filesAllow.includes(file.type)) {
        alert(`Formato de archivo no permitido, archivos permitidos: ${this.filesAllow}`);
        return
      }
    }
    let fileUpload = event.target.files[0];
    let result = confirm(`Desea subir el siguiente archivo: ${fileUpload.name}`);
    if (result) {
      let userInformation = this.authenticationService.getUserInformation();
      this.userService.updateClient(this.getClientUpdate(), `${userInformation.code_client}`);
    }
  }

  getClientUpdate(): ResponseUserDto {
    return {};
  }



  redirect(url: string) {
    this.router.navigate([url]);
  }

  getWhatsappUrl(): string {
    return `https://wa.me/57${this.whatsappNumber}?text=${environment.aditionalInfo.whatsappDefaultMessage}`;
  }

  downloadAgreement() {
    //cambiar por el archivo
    let userInformation = this.authenticationService.getUserInformation();
    if (userInformation.user.profile_picture) {
      downloadFile(userInformation.user.profile_picture, "perfil");
    }
  }


}
