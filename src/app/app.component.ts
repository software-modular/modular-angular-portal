import { Component, OnInit } from '@angular/core';
import { environment as Environment } from '../environments/environment';
import { NavbarOption } from './core/domain/beans/navbarOption';
import { NavbarConfiguration } from './core/domain/beans/navbarConfiguration';
import { getTypeNavbarByName, TypeNavbar } from './core/domain/enum/TypeNavbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  navbarConfiguration: NavbarConfiguration = {}
  ngOnInit(): void {
    this.loadNavbarConfiguration()
  }

  private loadNavbarConfiguration() {
    this.navbarConfiguration = {
      title: Environment.navbarConfiguration.title,
      srcLogo: Environment.navbarConfiguration.srcLogo,
      altLogo: Environment.navbarConfiguration.altLogo,
      logoRedirect: Environment.navbarConfiguration.logoRedirect,
      urlLogoRedirect: Environment.navbarConfiguration.urlLogoRedirect,
      typeNavbar: getTypeNavbarByName(Environment.navbarConfiguration.typeNavbar),
      options: this.getListOptions()
    }
  }

  private getListOptions(): NavbarOption[] {
    let navbarOptions: NavbarOption[] = [];
    Environment.navbarConfiguration.navbarOptions.forEach(option => {
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

}

