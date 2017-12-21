import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';
import { CourseAssign } from '../../Models/CourseAssign'


@Injectable()
export class CreditService {

  public server = ServerBasePath.serverPath;
  constructor(private http: HttpService) { }

  saveTeacher(teachers: any):any {
   return this.http.post(this.server + '/api/teacher/save', teachers).map(res => res.json());
  }

  saveTeacherSingle(teacher: any):any {
    return this.http.post(this.server + '/api/teacher/save-single', teacher).map(res => res.json());
   }

  saveCourses(course: any):any {
    return this.http.post(this.server + '/api/course/save', course).map(res => res.json());
  }

  saveAssignCourse(courseAssign: CourseAssign):any {
    return this.http.post(this.server + '/api/course/assign-course', courseAssign).map(res => res.json());
  }

  saveCourse(course: any):any {
    return this.http.post(this.server + '/api/course/save-single', course).map(res => res.json());
  }
  saveSection(section: any):any {
    return this.http.post(this.server + '/api/section/save', section).map(res => res.json());
  }
}
