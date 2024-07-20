import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BodyComponent } from './layout/components/body/body.component';

const routes: Routes = [
  {
    path: 'portal', component: BodyComponent, children: [
      { path: 'nav', component: NavbarComponent }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
