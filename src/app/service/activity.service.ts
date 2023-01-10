import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient, HttpParams} from "@angular/common/http";
import { Employee } from '../model/employee.model';
import { LoginModel } from '../model/login.model';
import { Activity } from '../model/activity.model';
import { DateDTO } from '../model/date-dto';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url:string='http://localhost:8888/api/activity/';
  date:Date

  constructor(protected httpClient: HttpClient) {


    this.date=new Date();
    console.log('activity service created')

  }



  addActivity( activity:Activity) {

    return this.httpClient.post<void>(this.url+ 'add',activity);
  }

  editActivity( activity:Activity) {
    return this.httpClient.post<void>(this.url+ 'edit',activity);
  }
  deleteActivityById( id:number) {
    return this.httpClient.delete<void>(this.url+ id);
  }

  getAllActivitiesOfToday( date:DateDTO,id:number ):Observable<Activity[]> {

    return this.httpClient.post<Activity[]>(this.url+ 'dayactivities/' +id,date);
  }

  getAllActivitiesOfPerson( id):Observable<Activity[]> {

    return this.httpClient.get<Activity[]>(this.url+'person/' +id);
  }

  getById(id:number):Observable<Activity>{
    return this.httpClient.get<Activity>(this.url +id);
  }




}
