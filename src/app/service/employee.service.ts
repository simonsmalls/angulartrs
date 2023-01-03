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


  constructor(protected httpClient: HttpClient) { }

  allEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.url);
  }



  findById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.url + "id");
  }



}
