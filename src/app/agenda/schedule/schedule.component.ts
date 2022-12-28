import {Component, Inject, OnInit} from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { DateDTO } from 'src/app/model/date-dto';
import { ActivityService } from 'src/app/service/activity.service';
import { EmployeeService } from 'src/app/service/employee.service';
import {MatTableDataSource} from "@angular/material/table";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../model/employee.model";


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
  user:Employee;
  date:DateDTO=new DateDTO();


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
    this.user=this.employeeService.connectedUser;

    this.date.year=2023;
    this.date.day=26;
    this.date.month=12;

    this.activityService.getAllActivitiesOfToday(this.date, this.user.id)
      .subscribe((c)=>{
        this.activities=c;

        this.dataSource.data=c;
      })
    this.entityForm=this.fb.group({
      date: [null],

    })
    this.datum=this.date.day+'/'+this.date.month+'/'+this.date.year;
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

  delete(id:number){
    this.activityService.deleteActivityById(id).subscribe((c)=>{
      this.activityService.getAllActivitiesOfToday(this.date, this.user.id)
        .subscribe((c)=>{
          this.activities=c;

          this.dataSource.data=c;
        })
    })
  }

  datePick(){
    let date=this.entityForm.controls['date'].value;
    console.log(date.getDay())
    this.datum=date.getDay()+'/'+date.getMonth()+'/'+date.getYeaer();

    this.date.year=date.year;
    this.date.day=date.day;
    this.date.month=date.month;
    console.log('date is picked')
    console.log(this.date)

    this.activityService.getAllActivitiesOfToday(this.date, this.user.id)
      .subscribe((c)=>{
        this.activities=c;

        this.dataSource.data=c;
      })
  }

}
