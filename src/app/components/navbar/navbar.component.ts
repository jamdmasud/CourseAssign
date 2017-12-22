import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../Services/authentications/auth.service';
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent  } from '../modal/change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, public route: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  openModal () {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px'
    });
  }

}
