import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/components/login/login.component';
import { RegisterComponent } from './components/authentication/components/register/register.component';
import { InputMultiRadioCheckComponent } from './core/components/input-multi-radio-check/input-multi-radio-check.component';
import { BodyComponent } from './layout/components/body/body.component';
import { MultifileUploadComponent } from './core/components/multifile-upload/multifile-upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal', component: BodyComponent, children: [
      { path: '', component: MultifileUploadComponent },
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
