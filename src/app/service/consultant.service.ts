import { Injectable } from '@angular/core';
import {WorkingTime} from "../model/working-time.model";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../model/employee.model";
import {ConsultantSalary} from "../model/consultant-salary.model";

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  url: string = "http://localhost:8888/api/employees/workingtime/"

  constructor(private httpClient: HttpClient) { }

  startClock(consultantId: number){
    return this.httpClient.get<WorkingTime>(this.url + `start/${consultantId}`);
  }

  endClock(consultantId: number){
    return this.httpClient.get<WorkingTime>(this.url + `end/${consultantId}`);
  }

  getWorkingTimesTodayForConsultant(consultantId: number){
    return this.httpClient.get<WorkingTime[]>(this.url + `${consultantId}`);
  }

  getOpenWorkingTimeTodayForConsultant(consultantId: number){
    return this.httpClient.get<WorkingTime>(this.url + `open/${consultantId}`);
  }

  getSalariesForAllConsultantsForYearAndMonth(year: number, month: number){
    return this.httpClient.get<ConsultantSalary[]>(this.url + `salaries/${year}/${month}`);
  }

  deleteWorkingTime(workingTime: WorkingTime){
    return this.httpClient.delete<void>(this.url + `${workingTime.id}`);
  }


}
