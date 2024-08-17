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

import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { AgrappProjectsCardComponent } from './components/agrapp/agrapp-projects-card/agrapp-projects-card.component';
import { AgrappProjectsListCardComponent } from './components/agrapp/agrapp-projects-list-card/agrapp-projects-list-card.component';
import { AgrappProjectsRegisterComponent } from './components/agrapp/agrapp-projects-register/agrapp-projects-register.component';
import { CarouselImgComponent } from './core/components/carousel-img/carousel-img.component';
import { DynamicFormComponent } from './core/components/dynamic-form/dynamic-form.component';
import { InputAutocompleteComponent } from './core/components/input-autocomplete/input-autocomplete.component';
import { InputDateComponent } from './core/components/input-date/input-date.component';
import { InputListOptionComponent } from './core/components/input-list-option/input-list-option.component';
import { InputMultiRadioCheckComponent } from './core/components/input-multi-radio-check/input-multi-radio-check.component';
import { InputNumberComponent } from './core/components/input-number/input-number.component';
import { InputTextAreaComponent } from './core/components/input-text-area/input-text-area.component';
import { InputTextComponent } from './core/components/input-text/input-text.component';
import { MultifileUploadComponent } from './core/components/multifile-upload/multifile-upload.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { EditUserComponent } from './core/section/edit-user/edit-user.component';
import { BodyComponent } from './layout/components/body/body.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { AgrappHomeComponent } from './pages/agrapp-home/agrapp-home.component';
import { AgrappInvestmentsComponent } from './pages/agrapp-investments/agrapp-investments.component';
import { AgrappProjectsComponent } from './pages/agrapp-projects/agrapp-projects.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { AgrappManageUserComponent } from './pages/agrapp-manage-user/agrapp-manage-user.component';
import { TableModule } from 'primeng/table';
import { UserModalComponent } from './components/agrapp-modals/user-modal/user-modal.component';
import { AgrappHomeAnimationsComponent } from './components/agrapp/agrapp-home-animations/agrapp-home-animations.component';
import { AgrappProjectsManagerComponent } from './pages/agrapp-projects-manager/agrapp-projects-manager.component';
import { ProjectModalComponent } from './components/agrapp-modals/project-modal/project-modal.component';
import { CustomMultifileUploadComponent } from './core/components/custom-multifile-upload/custom-multifile-upload.component';
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
    InputNumberComponent,
    UserProfileComponent,
    EditUserComponent,
    DynamicFormComponent,
    AgrappManageUserComponent,
    UserModalComponent,
    AgrappHomeAnimationsComponent,
    AgrappProjectsManagerComponent,
    ProjectModalComponent,
    CustomMultifileUploadComponent
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
    MatStepperModule,
    FileUploadModule,
    MultiSelectModule,
    HttpClientModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    DatePipe,
    ConfirmationService,
    MessageService,
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
