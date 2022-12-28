import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category.model";
import {Project} from "../model/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url:string='http://localhost:8888/api/project/';


  constructor(protected httpClient: HttpClient) { }

  getAllOngoing(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url);
  }
}
