import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../Services/authentications/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetForm;

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, private authService: AuthService,private toast: ToastyService) { }

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.resetForm = new FormGroup({
      id : new FormControl('', Validators.required),
      newPassword : new FormControl('', Validators.required),
      confirmPassword : new FormControl('', Validators.required)
    })
  }

  resetPasseord(data, isValid) {
    if(isValid) {
      if(data.newPassword !== data.confirmPassword){
        this.toast.error({
          title: "Failed",
          msg: "New password and confirm password is not match",
          showClose: true,
          timeout: 2000,
          theme: "default"
      });
      return false;
      }
        this.authService.resetPassword(data).subscribe(res => {
          this.toast.success({
            title: "Successful",
            msg: res,
            showClose: true,
            timeout: 2000,
            theme: "default"
          });
          this.dialogRef.close();
        }, error => {
          this.toast.error({
            title: "Failed",
            msg: error.json().message,
            showClose: true,
            timeout: 2000,
            theme: "default"
        });
        })
    }
  }


}
