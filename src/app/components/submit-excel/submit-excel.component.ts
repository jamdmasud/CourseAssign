import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { XlsxToJsonService } from '../../Services/Untilities/xlsx-to-json.service'; 
import { CreditService } from '../../Services/data-services/credit.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { AuthGuard,AuthService } from '../../Services/authentications/auth.service' 
@Component({
  selector: 'app-submit-excel',
  templateUrl: './submit-excel.component.html',
  styleUrls: ['./submit-excel.component.css']
})
export class SubmitExcelComponent implements OnInit {

  title = 'app'; 
  public result:any;
  public data:any;
  public teacher:any;
  constructor(private route: Router, private auth: AuthService, private xlsxToJsonService: XlsxToJsonService, private credit: CreditService,private toastyService:ToastyService, private toastyConfig: ToastyConfig,){
    this.toastyConfig.theme='material';
    if(!this.auth.checkLogged()){
      this.route.navigate(['/login']);
    }
  }
  handleFile(event) {
    let file = event.target.files[0];
    this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
      this.result = JSON.stringify(data['sheets'].Sheet1); 
      this.data = JSON.parse(this.result);
      this.teacher = data.sheets.Sheet1
      
    })
  }

  ngOnInit() {
  };

  saveTeacher(){
    this.credit.saveTeacher(this.teacher).subscribe(response => {   
      this.toastyService.success({
        title: "Successful!",
        msg: response,
        showClose: true,
        timeout: 4000,
        theme: "default"
    });
    this.teacher = {}
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
