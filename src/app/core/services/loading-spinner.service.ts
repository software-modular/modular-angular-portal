import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private show: boolean = false;

  constructor() { }

  public showSpinner(show: boolean) {
    this.show = show;
  }

  public getShowSpinner(): boolean {
    return this.show;
  }
}

