import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/authentications/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private auth:AuthService, private route:Router) {
    this.logout();
    this.route.navigate(['/upload-teacher']);
   }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
    location.reload();
  }
}
