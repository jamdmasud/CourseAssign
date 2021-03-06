import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../Services/data-services/course-service.service'
import { FormControl, Validators, FormGroup } from '@angular/forms'; 
import {ToastyService } from 'ng2-toasty';
import { JsonToXlsxService} from '../../Services/Untilities/json-to-xlsx.service'

@Component({
  selector: 'app-view-assigned',
  templateUrl: './view-assigned.component.html',
  styleUrls: ['./view-assigned.component.css']
})
export class ViewAssignedComponent implements OnInit {

  public assignedCourses;
  public courseReport;
  constructor( private toast: ToastyService,private courseService: CourseServiceService, private xlsx: JsonToXlsxService) { }


  ngOnInit() {
    this.getAssignedCourses();
  }

  getAssignedCourses(){
    this.courseService.assignedCourses().subscribe(response=>{
      this.assignedCourses = response;
      console.log(this.assignedCourses);
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

  export(){
    this.courseService.getAssignedCourses().subscribe(response =>{
      this.courseReport = response;
      console.log(this.courseReport);
    }, error =>{
      this.toast.error({
        title: "Assigned",
        msg: error.json().message,
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    });
    this.xlsx.exportAsExcelFile(this.courseReport, "AssignedCourse");
  }
}
