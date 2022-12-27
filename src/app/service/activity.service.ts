import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient, HttpParams} from "@angular/common/http";
import { Employee } from '../model/employee.model';
import { LoginModel } from '../model/login.model';
import { Activity } from '../model/activity.model';
import { DateDTO } from '../model/date-dto';

@Injectable({
  providedIn: 'any'
})
export class ActivityService {

  url:string='http://localhost:8888/api/activity/';


  constructor(protected httpClient: HttpClient) { }



  addActivity( activity:Activity) {
    return this.httpClient.post<void>(this.url+ 'add',activity);
  }

  getAllActivitiesOfToday( date:DateDTO,id:number ):Observable<Activity[]> {

    return this.httpClient.post<Activity[]>(this.url+ 'dayactivities/' +id,date);
  }

  getAllActivitiesOfPerson( id):Observable<Activity[]> {

    return this.httpClient.get<Activity[]>(this.url +id);
  }




}
