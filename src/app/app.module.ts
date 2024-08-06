import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // (si no está ya importado)
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatePipe } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { AgrappProjectsCardComponent } from './components/agrapp/agrapp-projects-card/agrapp-projects-card.component';
import { AgrappProjectsListCardComponent } from './components/agrapp/agrapp-projects-list-card/agrapp-projects-list-card.component';
import { AgrappProjectsRegisterComponent } from './components/agrapp/agrapp-projects-register/agrapp-projects-register.component';
import { LoginComponent } from './components/authentication/components/login/login.component';
import { RegisterComponent } from './components/authentication/components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselImgComponent } from './core/components/carousel-img/carousel-img.component';
import { InputAutocompleteComponent } from './core/components/input-autocomplete/input-autocomplete.component';
import { InputDateComponent } from './core/components/input-date/input-date.component';
import { InputListOptionComponent } from './core/components/input-list-option/input-list-option.component';
import { InputMultiRadioCheckComponent } from './core/components/input-multi-radio-check/input-multi-radio-check.component';
import { InputNumberComponent } from './core/components/input-number/input-number.component';
import { InputTextAreaComponent } from './core/components/input-text-area/input-text-area.component';
import { InputTextComponent } from './core/components/input-text/input-text.component';
import { MultifileUploadComponent } from './core/components/multifile-upload/multifile-upload.component';
import { BodyComponent } from './layout/components/body/body.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { AgrappHomeComponent } from './pages/agrapp-home/agrapp-home.component';
import { AgrappInvestmentsComponent } from './pages/agrapp-investments/agrapp-investments.component';
import { AgrappProjectsComponent } from './pages/agrapp-projects/agrapp-projects.component';
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
    InputTextComponent,
    CarouselImgComponent,
    AgrappProjectsComponent,
    AgrappProjectsRegisterComponent,
    AgrappInvestmentsComponent,
    AgrappProjectsCardComponent,
    AgrappProjectsListCardComponent,
    AgrappHomeComponent,
    InputTextAreaComponent,
    InputMultiRadioCheckComponent,
    MultifileUploadComponent,
    InputDateComponent,
    InputAutocompleteComponent,
    InputListOptionComponent,
    InputNumberComponent
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
    MatSnackBarModule,
    MatSliderModule,
    FileUploadModule,
    HttpClientModule,
    InputNumberModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), DatePipe,
  provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
