import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // (si no está ya importado)

import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/authentication/components/login/login.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { BodyComponent } from './layout/components/body/body.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/authentication/components/register/register.component';
import { AgrappProjectsComponent } from './pages/agrapp-projects/agrapp-projects.component';
import { AgrappProjectsRegisterComponent } from './pages/agrapp-projects-register/agrapp-projects-register.component';
import { AgrappInvestmentsComponent } from './pages/agrapp-investments/agrapp-investments.component';
import { AgrappProjectsCardComponent } from './pages/agrapp-projects-card/agrapp-projects-card.component';
import { AgrappProjectsListCardComponent } from './pages/agrapp-projects-list-card/agrapp-projects-list-card.component';
import { AgrappHomeComponent } from './pages/agrapp-home/agrapp-home.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    HeaderComponent,
    LayoutComponent,
    RegisterComponent,
    AgrappProjectsComponent,
    AgrappProjectsRegisterComponent,
    AgrappInvestmentsComponent,
    AgrappProjectsCardComponent,
    AgrappProjectsListCardComponent,
    AgrappHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCard,
    MatRadioButton,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
