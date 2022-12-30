import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private employeeService:EmployeeService,
              private router: Router) {
  }

  userConnected():boolean{
    if(this.employeeService.connectedUser==null ) {
      return true;
    }else{
      return false;
    }
  }

  disconnect(){
    this.employeeService.connectedUser=null;
    this.router.navigate(["/login"]);
    console.log("user gets disconnected");
  }

}
