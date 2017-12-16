import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';



@Injectable()
export class CreditService {

  public server = ServerBasePath.serverPath;
  constructor(private http: HttpService) { }

  saveTeacher(teacher: any):any {
   return this.http.post(this.server + '/api/teacher/save', teacher).map(res => res.json());
  }

  saveCourses(course: any):any {
    return this.http.post(this.server + '/api/course/save', course).map(res => res.json());
  }

  saveAssignCourse(teacher: any):any {
    return this.http.post(this.server + '', teacher).map(res => res.json());
  }

}
