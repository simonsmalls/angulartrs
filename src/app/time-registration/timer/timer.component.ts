import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {Employee} from "../../model/employee.model";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{

  user:Employee;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.employeeService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);
    console.log(this.user);
  }


}
