
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './Services/authentications/auth-guard.service';
//Components
import {LoginComponent} from './components/login/login.component'
import {SubmitExcelComponent} from './components/submit-excel/submit-excel.component'
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [  
  {path:'', component:HomeComponent, children: [
    {path: '', redirectTo: 'upload-teacher', pathMatch: 'full'},
    {path:'upload-teacher', component:SubmitExcelComponent,canActivate: [AuthGuard]}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}