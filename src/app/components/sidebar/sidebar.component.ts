import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ResetPasswordComponent } from '../modal/reset-password/reset-password.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openModal() {
    const dialogRef = this.dialog.open(ResetPasswordComponent);
  }

}
