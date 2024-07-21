import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BodyComponent } from './layout/components/body/body.component';
import { LoginComponent } from './components/authentication/components/login/login.component';

const routes: Routes = [
  {
    path: 'portal', component: BodyComponent, children: [
      { path: 'login', component: LoginComponent }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
