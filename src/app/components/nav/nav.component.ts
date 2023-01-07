import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Employee} from "../../model/employee.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  user:Employee;
  constructor(
    private employeeService:EmployeeService,
    private oathService:AuthService,
              private router: Router,
              ) {
    this.user=this.oathService.connectedUser;
  }

  userConnected():boolean{
    if(this.oathService.connectedUser==null ) {

      if (this.router.url!= '/login'){
        this.router.navigate(["/login"]);
      }

      return true;
    }else{
      this.user=this.oathService.connectedUser;
      return false;
    }
  }

  isConsultant(){

     if(this.oathService.connectedUser.hourlyRate!=0){
      return true
     }
     return false
  }

  isAccountant(){
    return (this.oathService.connectedUser.roles.includes("Accountant"));
  }

  isManager(){
    return (this.oathService.connectedUser.roles.includes("Manager"));
  }

  disconnect(){
    this.oathService.logout();
    this.router.navigate(["/login"]);
    console.log("user gets disconnected");
  }

}
