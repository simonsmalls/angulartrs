import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {EmployeeService} from "../../service/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LoginModel } from 'src/app/model/login.model';
import { Router } from '@angular/router';


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
              private router:Router,

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

    this.employeeService.checkLogin(loginmodel)
      .subscribe({
        next: (e) => {
          if (e!=null){
            this.employeeService.connectedUser = e;
            this.router.navigate(['/agenda/check']);
          }
        },
        error: () => {
          this.entityForm.controls['password'].reset();
        }
      });
  }
}
