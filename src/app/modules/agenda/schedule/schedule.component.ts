import {Component, Inject, OnInit} from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { DateDTO } from 'src/app/model/date-dto';
import { ActivityService } from 'src/app/service/activity.service';
import {MatTableDataSource} from "@angular/material/table";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../model/employee.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogOverviewExampleDialog} from "../dialog-overview-example-dialog/dialog-overview-example-dialog.component";
import {AuthService} from "../../../service/auth.service";


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
    private authService:AuthService,
    private activityService:ActivityService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private router:Router,
    private fb:FormBuilder,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.user=this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);

    this._locale='nl';
    this._adapter.setLocale(this._locale);

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
    if(this.authService.connectedUser==null){
      return false
    }
    return true;
  }
  add(){
    this.router.navigate(['/agenda/add'])
  }

  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {

      this.activityService.getAllActivitiesOfToday(this.date, this.user.id)
        .subscribe((c)=>{
          this.activities=c;

          this.dataSource.data=c;
        })


    });
  }

  delete(id:number){
    this.openDialog(id)
  }
  edit(id:number){
    this.router.navigate(['agenda/'+id+'/edit'])
  }

  datePick(){
    let date=this.entityForm.controls['date'].value;


    this.datum=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();

    this.date.year=date.getFullYear();
    this.date.day=date.getDate();
    this.date.month=date.getMonth()+1;

    console.log(this.date)

    this.activityService.getAllActivitiesOfToday(this.date, this.user.id)
      .subscribe((c)=>{
        this.activities=c;

        this.dataSource.data=c;
      })
  }

}



