import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgrappProjectsListCardComponent } from './components/agrapp/agrapp-projects-list-card/agrapp-projects-list-card.component';
import { LoginComponent } from './components/authentication/components/login/login.component';
import { RegisterComponent } from './components/authentication/components/register/register.component';
import { BodyComponent } from './layout/components/body/body.component';
import { AgrappProjectsComponent } from './pages/agrapp-projects/agrapp-projects.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal', component: BodyComponent, children: [
      { path: '', component: AgrappProjectsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
