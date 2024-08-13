import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgrappProjectsRegisterComponent } from './components/agrapp/agrapp-projects-register/agrapp-projects-register.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { BodyComponent } from './layout/components/body/body.component';
import { authenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal', component: BodyComponent, children: [
      { path: '', component: AgrappProjectsRegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [authenticationGuard()] },
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
