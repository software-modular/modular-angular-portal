import { AfterViewInit, Component } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgrappUserCompleteInformationModalComponent } from '../components/agrapp-modals/agrapp-user-complete-information-modal/agrapp-user-complete-information-modal.component';
import { ResponseClientDto } from '../core/domain/dto/responseClientDto';
import { UserTypeOptions } from '../core/domain/const/UserTypeOptions';
import { TypeClient } from '../core/domain/enum/TypeClient';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
}
