import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseServiceService {

  public server = ServerBasePath.serverPath;

  constructor(private http: HttpService) { }
  getAllCourse():any {
    return this.http.get(this.server + '/api/course/all-course').map(res => res.json());
   }
}
