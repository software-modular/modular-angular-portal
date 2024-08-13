import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private showUserInformationProfile: Boolean = false;
  private userInformation: any;

  constructor() { }

  public showUserProfileMenu(showUserInformation: Boolean) {
    this.showUserInformationProfile = showUserInformation
  }

  public getShowUserProfileMenu(): Boolean {
    return this.showUserInformationProfile;
  }

  public setUserInformation(user: any) {
    this.userInformation = user;
  }

  public getUserInformation() {
    return this.userInformation;
  }
}
