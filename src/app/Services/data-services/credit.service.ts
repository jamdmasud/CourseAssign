import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';



@Injectable()
export class CreditService {

  public server = ServerBasePath;
  constructor(private http: HttpService) { }

  saveTeacher(teacher: any):any {
   return this.http.post(this.server + '', teacher).map(res => res.json());
  }

  saveCourses(teacher: any):any {
    return this.http.post(this.server + '', teacher).map(res => res.json());
  }

  saveAssignCourse(teacher: any):any {
    return this.http.post(this.server + '', teacher).map(res => res.json());
  }

}
