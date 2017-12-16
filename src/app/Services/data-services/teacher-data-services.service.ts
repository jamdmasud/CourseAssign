import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class TeacherDataServicesService {

  public server = ServerBasePath.serverPath;

  constructor(private http: HttpService) { }

  getAllTeacher():any {
    return this.http.get(this.server + '/api/teacher/teacher-all').map(res => res.json());
   }
   getTeacher():any {
    return this.http.get(this.server + '/api/teacher/teachers').map(res => res.json());
   }
}
