import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/employee.model";
import {Category} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url:string='http://localhost:8888/api/category/';


  constructor(protected httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url);
  }
}
