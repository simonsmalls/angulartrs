import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {Employee} from "../../model/employee.model";
import {ConsultantService} from "../../service/consultant.service";
import {WorkingTime} from "../../model/working-time.model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{

  user:Employee;
  dataSource: WorkingTime[];
  displayedColumns: string[];


  constructor(
    private oathService: AuthService,
    private consultantService: ConsultantService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.oathService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);
    console.log(this.user);

    this.consultantService.getWorkingTimesTodayForConsultant(this.user.id)
      .subscribe((workingtimes) => {
        this.dataSource = workingtimes;
        console.log(workingtimes);
      })

    // make table
    this.displayedColumns = ['start time', 'end time', 'time worked'];

  }

  startDay(){
    if (this.user == null) return; //make alert / snackbar

    this.consultantService.startClock(this.user.id).subscribe(
      (workingTime) => {
        console.log("started: " , workingTime);
      }
    )
  }

  endDay(){
    if (this.user == null) return; //make alert / snackbar

    this.consultantService.endClock(this.user.id).subscribe(
      (workingTime) => {
        console.log("ended: ", workingTime);
      }
    )
  }

}
