import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private employeeService:EmployeeService) {
  }

  userConnected():boolean{
    if(this.employeeService.connectedUser==null ) {
      return true
    }else{
      return false;
    }
  }
  
  disconnect(){
    this.employeeService.connectedUser=null;
    console.log("user gets disconected")
  }

}
