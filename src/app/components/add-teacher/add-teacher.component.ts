import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CourseAssign } from '../../Models/CourseAssign';
import { CreditService } from '../../Services/data-services/credit.service';
import { TeacherDataServicesService } from '../../Services/data-services/teacher-data-services.service'
import {ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  public teacherForm:any;
  constructor(private creditService: CreditService, private toast: ToastyService,private teacherService: TeacherDataServicesService) { }


  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.teacherForm = new FormGroup({
      name: new FormControl('',Validators.required),
      initial: new FormControl('',Validators.required),
      designation: new FormControl('',Validators.required),
      cellNumber: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      takenCredit: new FormControl('',Validators.required),
    })
  }

  saveTeacher(data, valid){
    if(valid){
      this.creditService.saveTeacherSingle(data).subscribe(response =>{
        this.toast.success({timeout: 3000, title: 'Success', msg: response });
        this.teacherForm.reset();
        Object.keys(this.teacherForm.controls).forEach(key => {
          this.teacherForm.controls[key].setErrors('')
        });
      },error =>{
        this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
      })
    }
  }
}
