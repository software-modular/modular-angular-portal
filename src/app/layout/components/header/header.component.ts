import { Component, OnInit } from '@angular/core';
import { NavbarConfiguration } from '../../../core/domain/beans/navbarConfiguration';
import { NavbarOption } from '../../../core/domain/beans/navbarOption';
import { environment } from '../../../../environments/environment';
import { getTypeNavbarByName } from '../../../core/domain/enum/TypeNavbar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { NavbarService } from '../../../core/services/components/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  navbarConfiguration: NavbarConfiguration = {}

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.loadNavbarConfiguration()
  }

  private loadNavbarConfiguration() {
    this.navbarConfiguration = {
      title: environment.navbarConfiguration.title,
      srcLogo: environment.navbarConfiguration.srcLogo,
      altLogo: environment.navbarConfiguration.altLogo,
      logoRedirect: environment.navbarConfiguration.logoRedirect,
      urlLogoRedirect: environment.navbarConfiguration.urlLogoRedirect,
      typeNavbar: getTypeNavbarByName(environment.navbarConfiguration.typeNavbar),
      options: this.getListOptions()
    }
  }

  private getListOptions(): NavbarOption[] {
    let navbarOptions: NavbarOption[] = [];
    environment.navbarConfiguration.navbarOptions.forEach(option => {
      navbarOptions.push(this.getOption(option));
    });
    return navbarOptions;
  }

  private getOption(option: any): NavbarOption {
    let navbarOption: NavbarOption = {
      name: option.name,
      cssClass: option.cssClass,
      cssStyle: option.cssClass,
      disableOption: option.disableOption,
      redirect: option.redirect,
      showOption: option.showOption,
      urlRedirect: option.urlRedirect,
      type: option.type,
      icon: option.icon
    }
    return navbarOption;
  }

  login() {
    this.router.navigate(['/portal/login']);
  }

  logout() {
    this.navbarService.setUserIsLogin(false);
    this.navbarService.showUserProfileMenu(false);
    this.authenticationService.logoutUser();
    this.router.navigate(['/portal/login']);
  }
}
