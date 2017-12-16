import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class SectionServicesService {

 
  public server = ServerBasePath.serverPath;

  constructor(private http: HttpService) { }

  getSectionByBatchId(batchId:string):any {
    return this.http.get(this.server + '/api/section/section-by-batch-id/' + batchId ).map(res => res.json());
   }
   

}
