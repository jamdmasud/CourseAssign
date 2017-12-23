import { Component, OnInit, } from '@angular/core';
import { TeacherDataServicesService } from '../../Services/data-services/teacher-data-services.service'
import {ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public assignedCourses;

  constructor(private teacherService: TeacherDataServicesService,private toast: ToastyService) { }

  ngOnInit() {
    this.getMyInfo();
  }
  getMyInfo(){
    this.teacherService.getMyInfo().subscribe(response=>{
      this.assignedCourses = response; 
    },error=>{
      this.toast.error({
        title: "Assigned",
        msg: error.json().message,
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    })
  }

}
