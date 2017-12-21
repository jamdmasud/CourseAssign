import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetPasswordComponent>) { }

  ngOnInit() {
  }

  ResetPassword (data) {
    this.dialogRef.close();
  }

}
