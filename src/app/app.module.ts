import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';
import {HttpModule,RequestOptions, XHRBackend} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, LocationStrategy, HashLocationStrategy,APP_BASE_HREF  } from '@angular/common';
import {RouterModule, Routes, DefaultUrlSerializer, UrlTree} from '@angular/router'; 

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
//Angular 2 toaster notification
import {ToastyModule} from 'ng2-toasty';

//Services
import {HttpService} from './Services/authentications/http.service';
import {AuthService} from './Services/authentications/auth.service';
import {AuthGuard} from './Services/authentications/auth-guard.service';
import { XlsxToJsonService } from './Services/Untilities/xlsx-to-json.service';
import { CreditService } from './Services/data-services/credit.service'
import { SectionServicesService} from './Services/data-services/section-services.service';
import { BatchService } from './Services/data-services/batch.service'
import { JsonToXlsxService } from './Services/Untilities/json-to-xlsx.service'

//Components
import {AppComponent} from './app.component'
import { LoginComponent } from './components/login/login.component';
import { SubmitExcelComponent } from './components/submit-excel/submit-excel.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { UploadCourseComponent } from './components/upload-course/upload-course.component';
import { AssignCourseComponent } from './components/assign-course/assign-course.component';
import { TeacherDataServicesService } from './Services/data-services/teacher-data-services.service'
import { CourseServiceService } from './Services/data-services/course-service.service';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { ViewAssignedComponent } from './components/view-assigned/view-assigned.component';
import { SearchPipe } from './Models/search.pipe';
import { TeacherCreditComponent } from './components/teacher-credit/teacher-credit.component';
import { CourseCreditComponent } from './components/course-credit/course-credit.component';
import { ChangePasswordComponent } from './components/modal/change-password/change-password.component';
import { ResetPasswordComponent } from './components/modal/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'


export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpService(backend, defaultOptions);
}

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
      return super.parse(url.toLowerCase());
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitExcelComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    UploadCourseComponent,
    AssignCourseComponent,
    AddCourseComponent,
    AddSectionComponent,
    AddTeacherComponent,
    ViewAssignedComponent,
    SearchPipe,
    TeacherCreditComponent,
    CourseCreditComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,    
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    ToastyModule.forRoot(),
    AppRoutingModule,
    FlexLayoutModule
  ],
  entryComponents: [ChangePasswordComponent, ResetPasswordComponent],
  exports:[BrowserModule, ToastyModule,RouterModule ],
  providers: [XlsxToJsonService,AuthService,AuthGuard,CreditService,TeacherDataServicesService,CourseServiceService,
    SectionServicesService,BatchService,JsonToXlsxService,
    { provide: APP_BASE_HREF, useValue : '/' },
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
],
  
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
