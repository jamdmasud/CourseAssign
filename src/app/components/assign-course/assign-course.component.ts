import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatOptionSelectionChange, MatAutocompleteSelectedEvent} from '@angular/material/';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { TeacherDataServicesService } from '../../Services/data-services/teacher-data-services.service';
import { CourseServiceService } from '../../Services/data-services/course-service.service';
import { SectionServicesService} from '../../Services/data-services/section-services.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { AssignValidation } from '../../Models/AssignValidation'
import { CourseAssign } from '../../Models/CourseAssign'
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { CreditService } from '../../Services/data-services/credit.service';

export class State {
  constructor(public name: string, public initial: string, public id: string) { }
}

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  counts:number = 0;
  tCount:number = 0;
  teacherCtrl: FormControl;
  courseCtrl:FormControl;
  sectionCtrl: FormControl;
  filteredTeacher: Observable<any[]>;
  filteredCourse: Observable<any[]>;
  takenCredit:number = 0;
  remainingCredit:number = 0;
  teachers: State[];
  courses:any[];
  SelectedTeacher: any;
  SelectedCourse: any;
  Sections:any[];
  validation: AssignValidation;
  selectedSectionId:string;
  private courseAssign: CourseAssign;
  SelectedCourseList:CourseAssign[];
  selected:any;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig,private teacherData: TeacherDataServicesService, private courseService: CourseServiceService, private sectionService: SectionServicesService, private creditService: CreditService) {
    this.teacherCtrl = new FormControl();
    this.courseCtrl = new FormControl();
    this.sectionCtrl = new FormControl();
    this.validation = new AssignValidation();
    this.courseAssign =  new CourseAssign();
    this.SelectedCourseList = [];
  }

  ngOnInit() {
    //load teacher for autocomplete
    this.getAllTeacher();

  }

  getAllTeacher(){
    this.teacherData.getAllTeacher().subscribe(response => {
      this.teachers = response;
      console.log(this.teachers)
      this.filteredTeacher = this.teacherCtrl.valueChanges
      .startWith(null)
        .map(state => state ? this.filterteachers(state) : this.teachers.slice()) 
    });
  }

  getAllCourse(){
    this.courseService.getAllCourse().subscribe(response => {
      this.courses = response; 
      this.filteredCourse = this.courseCtrl.valueChanges.
        startWith(null).
        map(state => state ? this.filterCourse(state) : this.courses.slice())
    });
  }

  filterteachers(name: string) {
    return this.teachers.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  filterCourse(name: string) {
    return this.courses.filter(course =>
      course.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  SelectTeacher(ev:MatOptionSelectionChange,teacher){
    if(ev.source.selected){
      this.SelectedTeacher = teacher;
      this.getPresentCredit(teacher.id);  
      //Load courses for autocomplete after selecting teacher
      this.getAllCourse();
      this.tCount = 1;
    }
  }

getPresentCredit(id:string){
this.teacherData.getPresentCredit(id).subscribe(response => {
  this.takenCredit =  response.takenCredit;
  this.remainingCredit = response.remainingCredit;
}, error=>{
  this.toastyService.error({
    title: "Assigned",
    msg: error.json().message,
    showClose: true,
    timeout: 3000,
    theme: "default"
  });
})
}

  SelectdCourse(ev:MatOptionSelectionChange,course){
    if(ev.source.selected){
      this.SelectedCourse = course;  
      this.getSectionByBatchId(this.SelectedCourse.batchId);
      this.counts = 1;
    }
  }

  SelectdSection(sec){
    this.validation.courseId = this.SelectedCourse.id; 
    this.validation.sectionId = sec;
    this.validation.teacherId = this.SelectedTeacher.id;
    this.courseService.IsCourseAssigned(this.validation).subscribe(response => {
      if(response.isAssigned)
      {
        this.toastyService.error({
          title: "Assigned",
          msg: 'This course is already assigned to '  + response.name,
          showClose: true,
          timeout: 3000,
          theme: "default"
        });
      }

    }, error => { 
      this.toastyService.error({
        title: "Assigned",
        msg: error.json().message,
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    });
  }

  getSectionByBatchId(batchId:string){ 
    this.sectionService.getSectionByBatchId(batchId).subscribe(response =>{
      this.Sections = response;
    }, error =>{
      this.toastyService.error({
        title: "Failed!",
        msg: error.json().message,
        showClose: true,
        timeout: 5000,
        theme: "default"
      });
    });
  }
  
  assignCourse():void{
    let credit = this.remainingCredit;
    let teacherName = this.SelectedTeacher.name;
    this.remainingCredit -= this.SelectedCourse.creditPerSection;
    let section = this.Sections.find(x => x.id == this.selectedSectionId) 
    this.courseAssign.courseId = this.SelectedCourse.id;
    this.courseAssign.courseName = this.SelectedCourse.name;
    this.courseAssign.sectionName = section.name;
    this.courseAssign.sectionId = section.id;
    this.courseAssign.teacherId = this.SelectedTeacher.id;
    this.courseAssign.teacherName = teacherName;
    this.courseAssign.semester = this.SelectedCourse.batch; 
    //console.log(this.SelectedCourse)
    if(this.remainingCredit < 0)
    {
      this.toastyService.error({
        title: "Failed!",
        msg: "You can't assign more than " + credit + " Credit to " +   teacherName,
        showClose: true,
        timeout: 5000,
        theme: "default"
      }); 
      this.remainingCredit = credit;
    }else{
      this.creditService.saveAssignCourse(this.courseAssign).subscribe(response => {
        this.SelectedCourseList.push(this.courseAssign);
        this.counts = 0;
        this.tCount = 0;
        this.SelectedCourse = {};
        this.courseAssign = new CourseAssign();
        this.courseCtrl.setValue("");
        this.sectionCtrl.setValue("");
        this.toastyService.success({
          title:"Success",
          msg: response,
          showClose: true,
          timeout:3000,
          theme: "default"
        });
      }, error =>{
        this.toastyService.error({
          title: "Failed!",
          msg: error.json().message,
          showClose: true,
          timeout: 5000,
          theme: "default"
        }); 
      })      
    }
  }

}
