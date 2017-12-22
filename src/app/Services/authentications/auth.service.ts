import { Injectable } from '@angular/core';
import {Headers,Http} from '@angular/http';
import { CanActivate,Router } from '@angular/router';
import {ServerBasePath} from './server-base-path';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  private serverPath=ServerBasePath.serverPath;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http:Http, private route: Router) { }

  login(data:any){
    let body = 'username=' + data.username + '&password=' + data.password + '&grant_type=password';

   return this.http.post(this.serverPath+'/oauth/token',body,{headers:this.contentHeaders()}).map((res)=>{
    var data=res.json();
    localStorage.setItem('accessToken',data.access_token);
    return true;
   });

  }

   logout(){
     localStorage.removeItem('accessToken');
     this.route.navigate(['/login']);
   }

  registration(data:any,http:Http){
      return http.post(this.serverPath +'/api/accounts/registration',data);
  }

  changePassword (data) {
    return this.http.post(this.serverPath +'/api/accounts/ChangePassword',data).map(res => res.json());
  }

  resetPassword (data) {
    return this.http.post(this.serverPath +'/api/accounts/ResetPassword',data).map(res => res.json());
  }

  contentHeaders() {
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return header;
  }

  checkLogged(){
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken');
      return !this.jwtHelper.isTokenExpired(token);
    }else {
      return false;
    }
  }

  getLoggedUserName() {
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken');
      const tokenDecode = this.jwtHelper.decodeToken(token);
      return tokenDecode['unique_name'];
    }
    return null;
  }
  
  getLoggedRole() {
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken');
      const tokenDecode = this.jwtHelper.decodeToken(token);
      return tokenDecode['role'];
    }
    return null;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private authService: AuthService, private router: Router) { }
 
    canActivate() {
        if (!this.authService.checkLogged()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
