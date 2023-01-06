import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/employee.model";
import {Category} from "../model/category.model";
import {Company} from "../model/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url:string='http://localhost:8888/api/company/';


  constructor(protected httpClient: HttpClient) { }

  getAll(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.url);
  }
}
