import { Injectable } from '@angular/core';
import { NabvarUserInformation } from '../../domain/beans/navbarUserInformation';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private userIsLogin: Boolean = false;
  private showUserInformationProfile: Boolean = false;
  private showBtnLogin: Boolean = true;
  private userInformation: NabvarUserInformation = {
    name: "Usuario test",
    username: "UsuarioTest"
  };

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

  public setUserIsLogin(isLogin: Boolean) {
    this.userIsLogin = isLogin;
  }

  public getUserIsLogin(): Boolean {
    return this.userIsLogin;
  }

  public showLoginBtn(show: Boolean) {
    this.showBtnLogin = show;
  }

  public getShowBtnLogin() {
    return this.showBtnLogin;
  }
}
