import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/components/login/login.component';
import { RegisterComponent } from './components/authentication/components/register/register.component';
import { InputDateComponent } from './core/components/input-date/input-date.component';
import { BodyComponent } from './layout/components/body/body.component';
import { InputAutocompleteComponent } from './core/components/input-autocomplete/input-autocomplete.component';
import { InputListOptionComponent } from './core/components/input-list-option/input-list-option.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal', component: BodyComponent, children: [
      { path: '', component: InputListOptionComponent },
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
