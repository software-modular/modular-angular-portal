import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NavbarConfiguration } from '../../domain/beans/navbarConfiguration';
import { TypeNavbar } from '../../domain/enum/TypeNavbar';
import { NavbarService } from '../../services/components/navbar.service';

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

  constructor(
    private elementRef: ElementRef,
    private navbarService: NavbarService
  ) {
  }

  @HostListener('document:click', ['$event.target'])
  clickOutsideElement(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showCustomUserprofileOption = false;
      this.showCustomMenus = false;
    }
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

  userIsLogin(): Boolean {
    return this.navbarService.getShowUserProfileMenu();
  }

  private getEmail(): string {
    return "Juan Camilo Aranda";
  }


  private getUsername(): string {
    return "Juan Aranda";
  }


}
