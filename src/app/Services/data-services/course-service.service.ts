import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import {  AssignValidation } from '../../Models/AssignValidation'
import 'rxjs/add/operator/map';

@Injectable()
export class CourseServiceService {

  public server = ServerBasePath.serverPath;

  constructor(private http: HttpService) { }
  
  getAllCourse():any {
    return this.http.get(this.server + '/api/course/all-course').map(res => res.json());
   }
   
   IsCourseAssigned(model: AssignValidation):any{
    return this.http.post(this.server + '/api/course/is-course-assigned', model).map(res => res.json());
   }
}
