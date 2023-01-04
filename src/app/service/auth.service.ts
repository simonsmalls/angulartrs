import { Injectable } from '@angular/core';
import {Employee} from "../model/employee.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModel} from "../model/login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string='http://localhost:8888/api/employees/';
  connectedUser:Employee;

  constructor(protected httpClient: HttpClient) { }


  checkLogin( login:LoginModel): Observable<Employee> {
    return this.httpClient.post<Employee>(this.url+ 'login',login);
  }
  logout(){
    this.connectedUser=null;
  }


}
