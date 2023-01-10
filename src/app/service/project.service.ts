import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category.model";
import {Project} from "../model/project.model";
import {Company} from "../model/company.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url:string='http://localhost:8888/api/project/';


  constructor(protected httpClient: HttpClient) { }

  getAllOngoing(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url+ 'ongoing');
  }

  getAll(){
    return this.httpClient.get<Project[]>(this.url);
  }

  addProject( project:Project) {
    return this.httpClient.post<void>(this.url+ 'add',project);
  }

  getAllCompanies() {
    return this.httpClient.get<Company[]>(this.url + 'companies/all');
  }
}
