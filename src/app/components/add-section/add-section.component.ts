import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SectionServicesService} from '../../Services/data-services/section-services.service'
import { BatchService } from '../../Services/data-services/batch.service'
import {ToastyService} from 'ng2-toasty';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { CreditService } from '../../Services/data-services/credit.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  public sectionForm;
  public batches:any;
  public sections:any;

  constructor(private creditService: CreditService,  private sectionService: SectionServicesService, private toast: ToastyService, private batchService: BatchService) { }

  ngOnInit() {
    this.initializeForm();
    this.getAllBatch();
    this.getAllSection();
  }


  initializeForm(){
    this.sectionForm = new FormGroup({
      name: new FormControl('',Validators.required),
      batchId: new FormControl('',Validators.required),
    })
  }
  getAllBatch(){
    this.batchService.getAllBatch().subscribe(response=>{
      this.batches = response; 
    },error =>{
      this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
    })
  }

  getAllSection(){
    this.sectionService.getSections().subscribe(response =>{
      this.sections = response;
      console.log(this.sections);
    },error =>{
      this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
    })
  }

  saveSection(formData, valid){
    if(valid){
      this.creditService.saveSection(formData).subscribe(res => {
        this.toast.success({timeout: 3000, title: 'Success', msg: res });
        this.sectionForm.reset();
        Object.keys(this.sectionForm.controls).forEach(key => {
          this.sectionForm.controls[key].setErrors('')
        });
      }, error => {
        this.toast.error({timeout: 3000, title: 'Error', msg: error.json().message });
      })
    }
  }
}
