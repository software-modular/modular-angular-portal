import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NavbarConfiguration } from '../../../core/domain/beans/navbarConfiguration';
import { NavbarOption } from '../../../core/domain/beans/navbarOption';
import { ResponseClientDto } from '../../../core/domain/dto/responseClientDto';
import { getTypeNavbarByName } from '../../../core/domain/enum/TypeNavbar';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { NavbarService } from '../../../core/services/components/navbar.service';
import { NabvarUserInformation } from '../../../core/domain/beans/navbarUserInformation';
import { UserTypeOptions } from '../../../core/domain/const/UserTypeOptions';
import { TypeClient } from '../../../core/domain/enum/TypeClient';

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
    private navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadNavbarConfiguration();
  }

  private loadUserData() {
    if (this.authenticationService.userIsAuthenticated()) {
      let userData: ResponseClientDto = this.authenticationService.getUserInformation();
      if (userData.user !== undefined) {
        let userInformationNabvar: NabvarUserInformation = {
          name: userData.user.name || '',
          username: userData.user.email || '',
          roleUser: this.getUserRole(userData)
        }

        this.navbarService.setUserInformation(userInformationNabvar);
        this.navbarService.showUserProfileMenu(true);
        this.navbarService.showLoginBtn(false);

      }
    } else {
      this.navbarService.showUserProfileMenu(false);
      this.navbarService.showLoginBtn(true);
    }
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
      icon: option.icon,
      roleView: option.roleView
    }
    return navbarOption;
  }

  login() {
    this.redirect('/portal/login');
  }

  logout() {
    this.navbarService.setUserInformation({});
    this.navbarService.showUserProfileMenu(false);
    this.navbarService.showLoginBtn(true);
    this.authenticationService.logoutUser();
    this.loadNavbarConfiguration();
    this.redirect(environment.navbarConfiguration.urlRedirectCloseSession);
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  private getUserRole(userData: ResponseClientDto) {
    switch (userData.user.type_user) {
      case TypeClient.CLIENT: {
        return "USER"
      }
      case TypeClient.STAFF: {
        return "ADMIN"
      }
      default: {
        return "ALL"
      }
    }
  }
}
