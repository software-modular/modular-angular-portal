import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AgrappProjectsRegisterComponent } from './components/agrapp/agrapp-projects-register/agrapp-projects-register.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { BodyComponent } from './layout/components/body/body.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { AgrappManageUserComponent } from './pages/agrapp-manage-user/agrapp-manage-user.component';
import { AgrappHomeComponent } from './pages/agrapp-home/agrapp-home.component';
import { AgrappProjectsManagerComponent } from './pages/agrapp-projects-manager/agrapp-projects-manager.component';
import { AgrappProjectsRegisterComponent } from './components/agrapp/agrapp-projects-register/agrapp-projects-register.component';
import { AgrappProjectsComponent } from './pages/agrapp-projects/agrapp-projects.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal/home', pathMatch: 'full' },
  {
    path: 'portal', component: BodyComponent, children: [
      { path: '', component: AgrappHomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user/profile', component: UserProfileComponent, canActivate: [authenticationGuard()] },
      { path: 'user/management', component: AgrappManageUserComponent, canActivate: [authenticationGuard()] },
      { path: 'project/management', component: AgrappProjectsManagerComponent, canActivate: [authenticationGuard()] },
      { path: 'project', component: AgrappProjectsComponent, canActivate: [authenticationGuard()] },
      { path: 'home', component: AgrappHomeComponent },
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
