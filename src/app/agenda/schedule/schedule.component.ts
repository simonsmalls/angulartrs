import {Component, Inject, OnInit} from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { DateDTO } from 'src/app/model/date-dto';
import { ActivityService } from 'src/app/service/activity.service';
import { EmployeeService } from 'src/app/service/employee.service';
import {MatTableDataSource} from "@angular/material/table";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],

})
export class ScheduleComponent implements OnInit {
  activities:Activity[];
  dataSource = new MatTableDataSource<Activity>();
  displayedColumns: string[] = ['project','category','start time','end time','edit','delete'];
  entityForm: FormGroup;
  datum:string;


  constructor(
    private employeeService:EmployeeService,
    private activityService:ActivityService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private router:Router,
    private fb:FormBuilder,
              ) {



  }

  ngOnInit(): void {
    this._locale='fr';
    this._adapter.setLocale(this._locale);
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
    this.entityForm=this.fb.group({
      date: [null],

    })
    this.datum=date.day+'/'+date.month+'/'+date.year;
  }

  connected():boolean{
    if(this.employeeService.connectedUser==null){
      return false
    }
    return true;
  }
  add(){
    this.router.navigate(['agenda/toevoegen'])
  }

  datePick(){
    console.log('date is picked')
  }

}
