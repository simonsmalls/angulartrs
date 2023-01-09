import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Employee} from "../../model/employee.model";
import {ActivityService} from "../../service/activity.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  user:Employee;
  constructor(
    private employeeService:EmployeeService,
    private authService:AuthService,
              private router: Router,
    private activityService:ActivityService,
              ) {
    this.user=this.authService.connectedUser;
  }

  userConnected():boolean{
    if (!this.router.url.startsWith('/agenda')) {
      this.activityService.date=new Date();
      }
    if(this.authService.connectedUser==null ) {

      if (this.router.url!= '/login'){
        this.router.navigate(["/login"]);
      }

      return false;
    }else{
      this.user=this.authService.connectedUser;
      return true;
    }
  }

  isConsultant(){

     if(this.authService.connectedUser.hourlyRate!=0){
      return true
     }
     return false
  }

  isAccountant(){
    return (this.authService.connectedUser.roles.includes("Accountant"));
  }

  isManager(){
    return (this.authService.connectedUser.roles.includes("Manager"));
  }

  disconnect(){
    this.authService.logout();
    this.router.navigate(["/login"]);
    console.log("user gets disconnected");
  }

}
