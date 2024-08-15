import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgrappProjectsRegisterComponent } from './components/agrapp/agrapp-projects-register/agrapp-projects-register.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { BodyComponent } from './layout/components/body/body.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { AgrappManageUserComponent } from './pages/agrapp-manage-user/agrapp-manage-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal', component: BodyComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user/profile', component: UserProfileComponent, canActivate: [authenticationGuard()] },
      { path: 'user/management', component: AgrappManageUserComponent, canActivate: [authenticationGuard()] },
      { path: 'home', component: AgrappProjectsRegisterComponent, canActivate: [authenticationGuard()] },
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
