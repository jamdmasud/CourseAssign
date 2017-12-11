import { Injectable } from '@angular/core';
import {Headers,Http} from '@angular/http';
import { CanActivate,Router } from '@angular/router';
import {ServerBasePath} from './server-base-path';


@Injectable()
export class AuthService {

  private serverPath=ServerBasePath.serverPath;

  constructor(private http:Http) { }

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
     return true;
   }

  registration(data:any,http:Http){
      return http.post(this.serverPath +'/api/account/registration',data);
  }

  contentHeaders() {
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return header;
  }

  checkLogged(){
    return !!localStorage.getItem('accessToken');
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
