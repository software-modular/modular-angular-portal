import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  constructor(private auhtenticationService: AuthenticationService) { }

  testapi() {
    debugger
    this.auhtenticationService.authenticateUser();
  }
}
