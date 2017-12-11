
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

//Components
import {LoginComponent} from './components/login/login.component'
import {SubmitExcelComponent} from './components/submit-excel/submit-excel.component'
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [  
  {path:'', component:HomeComponent, children: [
    {path: '', component: SubmitExcelComponent},
    {path:'upload-teacher', component:SubmitExcelComponent}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}