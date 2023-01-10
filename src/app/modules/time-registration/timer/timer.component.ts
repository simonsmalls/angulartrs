import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import {Employee} from "../../../model/employee.model";
import {ConsultantService} from "../../../service/consultant.service";
import {WorkingTime} from "../../../model/working-time.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../service/auth.service";

import {PopupDeleteComponent} from "../popup-delete/popup-delete.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{

  user:Employee;
  dataSource: WorkingTime[];
  displayedColumns: string[];
  openWorkTime: WorkingTime;
  hasOpenWorkTime: boolean;


  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private consultantService: ConsultantService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);


    this.loadWorkingTimes();

    // make table
    this.displayedColumns = ['start', 'end', 'timeWorked', 'delete'];

  }

  loadWorkingTimes(){
    this.consultantService.getWorkingTimesTodayForConsultant(this.user.id)
      .subscribe((workingtimes) => {
        this.dataSource = workingtimes;
      });

    this.consultantService.getOpenWorkingTimeTodayForConsultant(this.user.id)
      .subscribe(workingtime =>  {
        this.openWorkTime = workingtime;
        this.hasOpenWorkTime = (this.openWorkTime != null);
        });
  }

  startDay(){
    if (this.user == null) return;

    this.consultantService.startClock(this.user.id).subscribe(
      (workingTime) => {
        this.loadWorkingTimes();
      }
    );


  }

  endDay(){
    if (this.user == null) return;

    let start:Date = new Date();
    start.setHours(Number(this.openWorkTime.startTime.substring(0, 2)), Number(this.openWorkTime.startTime.substring(3,5)) );
    let end = new Date();

    if (end.getHours()-start.getHours() == 0 && end.getMinutes()-start.getMinutes()==0){
      this.snackBar.open("U kunt niet minder dan een minuut werken", 'X', {panelClass: ['error'],
        duration:10000,verticalPosition:"top"});

    return;
    }

    /* PRODUCTION
    if (end.getHours()-start.getHours()  < 1){
      this.snackBar.open("U kunt niet minder dan een uur werken", 'X', {panelClass: ['error']});
      return;
    }
    */

    this.consultantService.endClock(this.user.id).subscribe(
      (workingTime) => {
        console.log("ended: ", workingTime);
        this.loadWorkingTimes();
      }
    );
  }

  delete(workingTime: WorkingTime){

    this.openDialog(workingTime);
  }

  openDialog(id: WorkingTime): void {
    const dialogRef = this.dialog.open(PopupDeleteComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
     this.loadWorkingTimes();
    });
  }
}
