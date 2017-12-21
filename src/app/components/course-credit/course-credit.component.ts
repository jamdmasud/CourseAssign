import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../Services/data-services/course-service.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-course-credit',
  templateUrl: './course-credit.component.html',
  styleUrls: ['./course-credit.component.css']
})
export class CourseCreditComponent implements OnInit {

  public CourseList;

  constructor(private course: CourseServiceService) { 
    course.CourseRemainingCredit().subscribe(courses => {
      this.CourseList =courses;
      console.log(this.CourseList);
    })   
  }

  ngOnInit() {
  }

}
