import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { ResponseClientDto } from '../../domain/dto/responseClientDto';
import { TypeClient } from '../../domain/enum/TypeClient';
import { ConfirmationService } from 'primeng/api';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgrappUserCompleteInformationModalComponent } from '../../../components/agrapp-modals/agrapp-user-complete-information-modal/agrapp-user-complete-information-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserAgreementService {

  constructor(
    private authenticationService: AuthenticationService,
    public dialog: MatDialog

  ) { }

  validateUserAgreement() {
    if (this.authenticationService.userIsAuthenticated()) {
      let userInformation: ResponseClientDto = this.authenticationService.getUserInformation();
      userInformation.user.status = false;
      if (userInformation.user.type_user === TypeClient.CLIENT.toString() && !userInformation.user.status) {
        this.showModalCompleteUserInformation();
      }
    }
  }


  private showModalCompleteUserInformation() {
    this.openModal(AgrappUserCompleteInformationModalComponent);
  }


  private openModal(component: any, data?: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((_) => {

    });
  }
}
