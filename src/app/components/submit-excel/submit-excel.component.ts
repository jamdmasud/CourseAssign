import { Component, OnInit } from '@angular/core';
import { XlsxToJsonService } from '../../Services/Untilities/xlsx-to-json.service'; 
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
  constructor(private xlsxToJsonService: XlsxToJsonService){}
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

}
