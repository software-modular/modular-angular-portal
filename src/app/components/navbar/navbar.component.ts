import { Component, Input } from '@angular/core';
import { NavbarConfiguration } from '../../core/domain/beans/navbarConfiguration';
import { TypeNavbar } from '../../core/domain/enum/TypeNavbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userIsAuthenticate: boolean = false;

  readonly MENU_OPTION_TYPE = "MENU";
  readonly USERPROFILE_OPTION_TYPE = "USER_PROFILE_MENU";
  showCustomUserprofileOption: boolean = false;
  showCustomMenus: boolean = false;


  @Input() configuration: NavbarConfiguration = {
    title: "Default",
    altLogo: "Default",
    options: [],
    srcLogo: "",
    typeNavbar: TypeNavbar.DEFAULT
  };

  constructor() {
  }


  getEmailShort(): string {
    let shortUsername = this.getEmail();
    return `${shortUsername.slice(0, 25)}...`
  }

  getInitialLettersName() {
    let username: string = this.getUsername();
    let names: string[] = username.split(" ");
    return `${names[0][0]}${names[1][0]} `;
  }

  showCustomMenu() {
    this.showCustomMenus = !this.showCustomMenus;
  }

  showCustomProfile() {
    this.showCustomUserprofileOption = !(this.showCustomUserprofileOption);
  }

  private getEmail(): string {
    return "Juan Camilo Aranda";
  }


  private getUsername(): string {
    return "Juan Aranda";
  }


}
