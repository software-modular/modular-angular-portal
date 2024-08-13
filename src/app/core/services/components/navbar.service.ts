import { Injectable } from '@angular/core';
import { NabvarUserInformation } from '../../domain/beans/navbarUserInformation';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private showUserInformationProfile: Boolean = false;
  private userInformation!: NabvarUserInformation;

  constructor() { }

  public showUserProfileMenu(showUserInformation: Boolean) {
    this.showUserInformationProfile = showUserInformation
  }

  public getShowUserProfileMenu(): Boolean {
    return this.showUserInformationProfile;
  }

  public setUserInformation(user: NabvarUserInformation) {
    this.userInformation = user;
  }

  public getUserInformation(): NabvarUserInformation {
    return this.userInformation;
  }
}
