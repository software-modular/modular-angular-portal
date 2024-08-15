import { Component, OnInit } from '@angular/core';
import { NavbarConfiguration } from '../../../core/domain/beans/navbarConfiguration';
import { NavbarOption } from '../../../core/domain/beans/navbarOption';
import { environment } from '../../../../environments/environment';
import { getTypeNavbarByName } from '../../../core/domain/enum/TypeNavbar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { NavbarService } from '../../../core/services/components/navbar.service';
import { ClientService } from '../../../core/services/client/client.service';
import { JwtContent } from '../../../core/domain/beans/jwtContent';
import { ResponseClientDto } from '../../../core/domain/dto/responseClientDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  navbarConfiguration: NavbarConfiguration = {}

  showCustomProfileMenu: Boolean = false;
  showBtnLogin: Boolean = false;

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
      let userData: ResponseClientDto = this.authenticationService.getUserAuthenticated();
      if (userData.user !== undefined) {
        this.showCustomProfileMenu = true
        this.showBtnLogin = false;
      } else {
        this.showCustomProfileMenu = false
        this.showBtnLogin = true;
        this.redirect('/portal/login');
      }
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
      icon: option.icon
    }
    return navbarOption;
  }

  login() {
    this.redirect('/portal/login');
  }

  logout() {
    this.navbarService.setUserIsLogin(false);
    this.navbarService.showUserProfileMenu(false);
    this.authenticationService.logoutUser();
    this.redirect('/portal/login');
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
