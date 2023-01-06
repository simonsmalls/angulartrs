import { Injectable } from '@angular/core';
import {Employee} from "../model/employee.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModel} from "../model/login.model";
import {AnalyzeForm} from "../model/analyze-form";
import {AnalyzeDTO} from "../model/analyze-dto";

@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {

  url:string='http://localhost:8888/api/analyze/';
  connectedUser:Employee;

  constructor(protected httpClient: HttpClient) { }


  analyze( analyze:AnalyzeForm): Observable<AnalyzeDTO[]> {
    return this.httpClient.post<AnalyzeDTO[]>(this.url,analyze);
  }



}
