import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';

@Injectable()
export class SectionServicesService {

 
  public server = ServerBasePath.serverPath;

  constructor(private http: HttpService) { }

  getSectionByBatchId(batchId:string):any {
    return this.http.get(this.server + '/api/section/section-by-batch-id/' + batchId ).map(res => res.json());
   }
   
   private data = [
     {name: 'A'},
     {name: 'B'},
     {name: 'C'},
     {name: 'D'},
     {name: 'E'},
     {name: 'F'},
     {name: 'I'},
     {name: 'J'}
   ]
   getSections():Observable<any>{
     return of(this.data);
   }
}
