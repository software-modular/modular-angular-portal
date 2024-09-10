import { Component } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrl: './spinners.component.css'
})
export class SpinnersComponent {

  constructor(private loadingSpinnerService: LoadingSpinnerService) {
  }

  showSpinner() {
    return this.loadingSpinnerService.getShowSpinner();
  }
}
