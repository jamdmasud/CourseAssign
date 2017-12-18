import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CourseAssign } from '../../Models/CourseAssign';
import { CreditService } from '../../Services/data-services/credit.service';
import {ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

 public courseForm;

  constructor(private creditService: CreditService, private toast: ToastyService) { }

  ngOnInit() {
    this.courseForm = new FormGroup({
      name: new FormControl('',Validators.required),
      code: new FormControl('',Validators.required),
      batch: new FormControl('',Validators.required),
      creditPerSection: new FormControl('',Validators.required),
      totalCredit: new FormControl('',Validators.required),
    })
  }

  saveCourse(courseData, valid) {
    if(valid) {
      this.creditService.saveCourse(courseData).subscribe(res => {
        this.toast.success({timeout: 3000, title: 'Success', msg: res });
      }, error => {
        this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
      })
    }
  }

}
