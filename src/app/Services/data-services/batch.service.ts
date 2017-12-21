import { Injectable } from '@angular/core';
import { ServerBasePath } from '../authentications/server-base-path';
import { HttpService } from '../authentications/http.service';
import {  AssignValidation } from '../../Models/AssignValidation'
import 'rxjs/add/operator/map';

@Injectable()
export class BatchService {

  public server = ServerBasePath.serverPath;
  constructor(private http: HttpService) { }
  getAllBatch():any {
    return this.http.get(this.server + '/api/batch/all-batch').map(res => res.json());
   }
}
