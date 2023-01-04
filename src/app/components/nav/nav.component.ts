import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import {Router} from "@angular/router";
import {OathService} from "../../service/oath.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(
    private employeeService:EmployeeService,
    private oathService:OathService,
              private router: Router,
              ) {
  }

  userConnected():boolean{
    if(this.oathService.connectedUser==null ) {
      return true;
    }else{
      return false;
    }
  }
  isConsultant(){

     if(this.oathService.connectedUser.hourlyRate!=0){
      return true
     }
     return false
  }

  disconnect(){
    this.oathService.connectedUser=null;
    this.router.navigate(["/login"]);
    console.log("user gets disconnected");
  }

}
