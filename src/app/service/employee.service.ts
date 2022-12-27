import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient, HttpParams} from "@angular/common/http";
import { Employee } from '../model/employee.model';
import { LoginModel } from '../model/login.model';
import {WorkingTime} from "../model/working-time.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url:string='http://localhost:8888/api/employees/';
  connectedUser:Employee

  constructor(protected httpClient: HttpClient) { }

  allEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.url);
  }

  checkLogin( login:LoginModel): Observable<Employee> {
    return this.httpClient.post<Employee>(this.url+ 'login',login);
  }

  findById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.url + "id");
  }

  startClock(consultantId: number){
    return this.httpClient.get<WorkingTime>(this.url + `workingtime/start/${consultantId}`);
  }

}
