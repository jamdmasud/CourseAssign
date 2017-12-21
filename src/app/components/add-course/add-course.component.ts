import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CourseAssign } from '../../Models/CourseAssign';
import { CreditService } from '../../Services/data-services/credit.service';
import { BatchService } from '../../Services/data-services/batch.service'
import {ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

 public courseForm;
public batches;
  constructor(private creditService: CreditService, private toast: ToastyService,private batchService: BatchService) { }

  ngOnInit() {
   this.getAllBatch();
    this.initializeForm();
  }

  getAllBatch(){
    this.batchService.getAllBatch().subscribe(response=>{
      this.batches = response; 
    },error =>{
      this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
    })
  }

  initializeForm(){
    this.courseForm = new FormGroup({
      name: new FormControl('',Validators.required),
      code: new FormControl('',Validators.required),
      batchId: new FormControl('',Validators.required),
      creditPerSection: new FormControl('',Validators.required),
      totalCredit: new FormControl('',Validators.required),
    })
  }
  saveCourse(courseData, valid) {
    if(valid) {
      this.creditService.saveCourse(courseData).subscribe(res => {
        this.toast.success({timeout: 3000, title: 'Success', msg: res });
        this.courseForm.reset();
        Object.keys(this.courseForm.controls).forEach(key => {
          this.courseForm.controls[key].setErrors('')
        });
      }, error => {
        this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
      })
    }
  }
}
