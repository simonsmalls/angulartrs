import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {EmployeeService} from "../../service/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LoginModel } from 'src/app/model/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
    hide:boolean=true
  entityForm: FormGroup;


  constructor(private employeeService:EmployeeService,
              private fb:FormBuilder,

              ){}

  ngOnInit(): void {
    this.entityForm=this.fb.group({
      username: [null,Validators.required],
      password: [null,Validators.required],


    })

    }


  login(){
    let loginmodel:LoginModel=new LoginModel();

    loginmodel.password = this.entityForm.controls['password'].value;
    loginmodel.abbreviation = this.entityForm.controls['username'].value;

    console.log(loginmodel.password)
    console.log(loginmodel.abbreviation)
    
    this.employeeService.checkLogin(loginmodel).subscribe((c)=>{
      if(c!=null){
        this.employeeService.connectedUser=c;
        console.log("user is connected")
      }
      }
      
    )

  }
}
