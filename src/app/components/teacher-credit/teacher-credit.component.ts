import { Component, OnInit } from '@angular/core';
import { TeacherDataServicesService } from '../../Services/data-services/teacher-data-services.service'
@Component({
  selector: 'app-teacher-credit',
  templateUrl: './teacher-credit.component.html',
  styleUrls: ['./teacher-credit.component.css']
})
export class TeacherCreditComponent implements OnInit {
public teachers;
  constructor(private teacherServiec: TeacherDataServicesService) { 
    this.teacherServiec.TeacherRemainingCredit().subscribe(courses => {
      this.teachers =courses;
      console.log(this.teachers);
    })   
  }

  ngOnInit() {
  }

}
