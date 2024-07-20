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
export class AppComponent   {

}

