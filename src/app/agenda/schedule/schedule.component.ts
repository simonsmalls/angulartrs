import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { DateDTO } from 'src/app/model/date-dto';
import { ActivityService } from 'src/app/service/activity.service';
import { EmployeeService } from 'src/app/service/employee.service';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  activities:Activity[];
  dataSource = new MatTableDataSource<Activity>();
  displayedColumns: string[] = ['project','category','edit','delete'];

  constructor(
    private employeeService:EmployeeService,
    private activityService:ActivityService,
              ) {

  }

  ngOnInit(): void {
    let user=this.employeeService.connectedUser;
    let date=new DateDTO();
    date.year=2022;
    date.day=26;
    date.month=12;

    this.activityService.getAllActivitiesOfToday(date, user.id)
      .subscribe((c)=>{
        this.activities=c;

        this.dataSource.data=c;
      })




  }

  connected():boolean{
    if(this.employeeService.connectedUser==null){
      return false
    }
    return true;
  }

}
