import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { TeacherDataServicesService } from '../../Services/data-services/teacher-data-services.service'
import { CourseServiceService } from '../../Services/data-services/course-service.service'

export class State {
  constructor(public Name: string, public Initial: string, public Id: string) { }
}

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  
  stateCtrl: FormControl;
  courseCtrl:FormControl;
  filteredTeacher: Observable<any[]>;
  filteredCourse: Observable<any[]>;
  takenCredit:number = 0;
  remainingCredit:number = 0;
  states: State[];
  courses:any[];
  SelectedTeacher: any;
  SelectedCourse: any;
  constructor(private teacherData: TeacherDataServicesService, private courseService: CourseServiceService) {
    this.stateCtrl = new FormControl();
    
  }

  ngOnInit() {
    //load teacher for autocomplete
    this.teacherData.getAllTeacher().subscribe(response => {
      this.states = response;
      this.filteredTeacher = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
    });

    //Load courses for autocomplete
    this.courseService.getAllCourse().subscribe(response => {
      this.courses = response;
      this.filteredCourse = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterCourse(state) : this.courses.slice())
      );
    });
  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  filterCourse(name: string) {
    return this.courses.filter(course =>
      course.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  SelectTeacher(teacher){
    this.SelectedTeacher = teacher;
    this.takenCredit =  this.SelectedTeacher.TakenCredit;
    this.remainingCredit = this.SelectedTeacher.RemainingCredit;
  }

  SelectdCourse(course){
    this.SelectedCourse = course;
  }
}
