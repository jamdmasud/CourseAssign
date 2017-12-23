
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './Services/authentications/auth-guard.service';
//Components
import {LoginComponent} from './components/login/login.component'
import {SubmitExcelComponent} from './components/submit-excel/submit-excel.component'
import { HomeComponent } from './components/home/home.component';
import { UploadCourseComponent } from './components/upload-course/upload-course.component'
import { AssignCourseComponent } from './components/assign-course/assign-course.component'
import {AddCourseComponent } from './components/add-course/add-course.component';
import { AddSectionComponent } from './components/add-section/add-section.component'
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component'
import { ViewAssignedComponent } from './components/view-assigned/view-assigned.component';
import { CourseCreditComponent } from './components/course-credit/course-credit.component';
import { TeacherCreditComponent } from './components/teacher-credit/teacher-credit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'


const routes: Routes = [  
  {path:'', component:HomeComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path:'upload-teacher', component: SubmitExcelComponent, canActivate: [AuthGuard]},
    {path:'upload-courses', component: UploadCourseComponent, canActivate: [AuthGuard]},
    {path:'assign-course', component: AssignCourseComponent, canActivate: [AuthGuard]},
    {path:'add-section', component: AddSectionComponent, canActivate: [AuthGuard]},
    {path:'add-course', component: AddCourseComponent, canActivate: [AuthGuard]},
    {path:'add-teacher', component: AddTeacherComponent, canActivate: [AuthGuard]},
    {path:'remain-courses-credit', component: CourseCreditComponent, canActivate: [AuthGuard]},
    {path:'assigned-courses', component: ViewAssignedComponent, canActivate: [AuthGuard]},
    {path:'remain-teachers-credit', component: TeacherCreditComponent, canActivate: [AuthGuard]}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}