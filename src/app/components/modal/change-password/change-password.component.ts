import { Component, OnInit } from '@angular/core';
import { MatDialogRef  } from '@angular/material';
import { AuthService } from '../../../Services/authentications/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userRole;
  public changeForm;
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private authService: AuthService,
              private toast: ToastyService) { }

  ngOnInit() {
    this.userRole = this.authService.getLoggedRole();
    this.initialForm();
  }

  initialForm() {
    this.changeForm = new FormGroup({
      oldPassword : new FormControl('', Validators.required),
      newPassword : new FormControl('', Validators.required),
      confirmPassword : new FormControl('', Validators.required)
    })
  }

  changePasseord(data, isValid) {
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
        this.authService.changePassword(data).subscribe(res => {
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
