import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import {Employee} from "../../../model/employee.model";
import {ConsultantService} from "../../../service/consultant.service";
import {WorkingTime} from "../../../model/working-time.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../service/auth.service";


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
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);
    console.log(this.user);

    this.loadWorkingTimes();

    // make table
    this.displayedColumns = ['start', 'end', 'timeWorked', 'delete'];

  }

  loadWorkingTimes(){
    this.consultantService.getWorkingTimesTodayForConsultant(this.user.id)
      .subscribe((workingtimes) => {
        this.dataSource = workingtimes;
        console.log(workingtimes);
      });

    this.consultantService.getOpenWorkingTimeTodayForConsultant(this.user.id)
      .subscribe(workingtime =>  {
        this.openWorkTime = workingtime;
        this.hasOpenWorkTime = (this.openWorkTime != null);
        console.log('current: ', workingtime)});
  }

  startDay(){
    if (this.user == null) return; //make alert / snackbar

    this.consultantService.startClock(this.user.id).subscribe(
      (workingTime) => {
        console.log("started: " , workingTime);
        this.loadWorkingTimes();
      }
    );


  }

  endDay(){
    if (this.user == null) return; //make alert / snackbar

    if (this.openWorkTime == null){
      // throw error
    }

    let start:Date = new Date();
    start.setHours(Number(this.openWorkTime.startTime.substring(0, 2)), Number(this.openWorkTime.startTime.substring(3,5)) );
    let end = new Date();

    if (end.getHours()-start.getHours() == 0 && end.getMinutes()-start.getMinutes()==0){
      // delete instead of adding OR just throw error and add deleteButton
      // throw Error("U kunt niet minder dan een minuut werken");
      this.snackBar.open("U kunt niet minder dan een minuut werken", 'X', {panelClass: ['error'],
        duration:10000,verticalPosition:"top"});

    return;
    }

    /* PRODUCTION
    if (end.getHours()-start.getHours() == 0){
      this.snackBar.open("U kunt niet minder dan een minuut werken", 'X', {panelClass: ['error']});
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
    this.consultantService.deleteWorkingTime(workingTime)
      .subscribe(() => {
        this.loadWorkingTimes();
      });
  }
}
