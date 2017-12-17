import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/';
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

export class State {
  constructor(public Name: string, public Initial: string, public Id: string) { }
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

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig,private teacherData: TeacherDataServicesService, private courseService: CourseServiceService, private sectionService: SectionServicesService) {
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
      state.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  filterCourse(name: string) {
    return this.courses.filter(course =>
      course.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  SelectTeacher(teacher){
    if(this.tCount == 0){
      this.SelectedTeacher = teacher;
      this.takenCredit =  this.SelectedTeacher.TakenCredit;
      this.remainingCredit = this.SelectedTeacher.RemainingCredit;
      //Load courses for autocomplete after selecting teacher
      this.getAllCourse();
      this.tCount = 1;
    }
  }

  SelectdCourse(course){
    if(this.counts == 0){
      this.SelectedCourse = course;  
      this.getSectionByBatchId(this.SelectedCourse.BatchId);
      this.counts = 1;
    }
  }


  SelectdSection(sec){
    this.validation.CourseId = this.SelectedCourse.Id;
    this.validation.SectionId = sec;
    this.validation.TeacherId = this.SelectedTeacher.Id;
    this.courseService.IsCourseAssigned(this.validation).subscribe(response => {
      if(response.IsAssigned)
      {
        this.toastyService.error({
          title: "Assigned",
          msg: 'This course is already assigned to '  + response.Name,
          showClose: true,
          timeout: 3000,
          theme: "default"
        });
      }

    }, error => { 
      this.toastyService.error({
        title: "Assigned",
        msg: error.json().Message,
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
        msg: error.json().Message,
        showClose: true,
        timeout: 5000,
        theme: "default"
      });
    });
  }
  
  assignCourse():void{
    let credit = this.remainingCredit;
    let teacherName = this.SelectedTeacher.Name;
    this.remainingCredit -= this.SelectedCourse.CreditPerSection;
    let section = this.Sections.find(x => x.Id == this.selectedSectionId) 
    this.courseAssign.CourseId = this.SelectedCourse.Id;
    this.courseAssign.CourseName = this.SelectedCourse.Name;
    this.courseAssign.SectionName = section.Name;
    this.courseAssign.SectionId = section.Id;
    this.courseAssign.TeacherId = this.SelectedTeacher.Id;
    this.courseAssign.TeacherName = teacherName;
    this.courseAssign.Semester = this.SelectedCourse.Batch; 
    //console.log(this.SelectedCourse)
    if(this.remainingCredit < 0)
    {
      alert("You can't assign more than " + credit + " Credit to " +   teacherName);
      this.remainingCredit = credit;
    }else{
      this.SelectedCourseList.push(this.courseAssign);
      this.counts = 0;
      this.tCount = 0;
    }
    console.log(this.SelectedCourseList);
    this.courseAssign = new CourseAssign();

    this.courseCtrl.setValue("")
  }

}
