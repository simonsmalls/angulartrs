import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activity} from "../model/activity.model";
import {Observable} from "rxjs";
import {Project} from "../model/project.model";
import {Invoice} from "../model/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url:string='http://localhost:8888/api/invoice/';

  constructor(protected httpClient: HttpClient) { }


  updateProjectInvoice( projectId:number) {
    return this.httpClient.get<void>(this.url +"calculate/" + projectId);
  }

  getAllInvoicesOfId(projectId:number): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.url + projectId);
  }

  finaliseInvoice(invoiceId:number) {
    return this.httpClient.get<void>(this.url + "finalise/" + invoiceId);
  }

}
