import { Component, OnInit } from '@angular/core';
import { MatDialogRef  } from '@angular/material';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit() {
  }

  

}
