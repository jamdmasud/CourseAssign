import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { XlsxToJsonService } from '../../Services/Untilities/xlsx-to-json.service'; 
import { CreditService } from '../../Services/data-services/credit.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { AuthGuard,AuthService } from '../../Services/authentications/auth.service' 

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.css']
})
export class UploadCourseComponent implements OnInit {
  title = 'app'; 
  public result:any;
  public data:any;
  public courses:any;
  constructor(private route: Router, private auth: AuthService, private xlsxToJsonService: XlsxToJsonService, private credit: CreditService,private toastyService:ToastyService, private toastyConfig: ToastyConfig) { }

  ngOnInit() {
  }

  uploadCourse(event) {
    let file = event.target.files[0];
    this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
      this.result = JSON.stringify(data['sheets'].Sheet1); 
      this.data = JSON.parse(this.result);
      this.courses = data.sheets.Sheet1
    })
  }


  saveCourses(){
    this.credit.saveCourses(this.courses).subscribe(response => {   
      this.toastyService.success({
        title: "Successful!",
        msg: response,
        showClose: true,
        timeout: 4000,
        theme: "default"
    });
    this.courses = {}
    },error =>{
      this.toastyService.error({
        title: "Failed!",
        msg: error,
        showClose: true,
        timeout: 5000,
        theme: "default"
    });
    })
  }

}
