import {Component, Inject, Input, OnInit} from '@angular/core';
import {Activity} from "../../../model/activity.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../model/project.model";
import {AuthService} from "../../../service/auth.service";
import {ProjectService} from "../../../service/project.service";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {Company} from "../../../model/company.model";
import {DateDTO} from "../../../model/date-dto";
import {CompanyService} from "../../../service/company.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  entityForm: FormGroup;
  user = this.authService.connectedUser;
  companies: Company[];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.companyService.getAll().subscribe((c) => {
      this.companies = c;
    })

    this.entityForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      clientId: [null, Validators.required],
      hourlyRate: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],

    })

  }

  startDatePick(){
    let date=this.entityForm.controls['startDate'].value;
  }

  endDatePick(){
    let date=this.entityForm.controls['endDate'].value;
  }

  formValid(){
    return (this.entityForm.controls['name'].valid && this.entityForm.controls['description'].valid
    && this.entityForm.controls['clientId'].valid && this.entityForm.controls['hourlyRate'].valid
    && this.entityForm.controls['startDate'].valid && this.entityForm.controls['endDate'].valid)
  }

  add() {

    if (!this.formValid()) return;

    let project = new Project();
    project.name = this.entityForm.controls['name'].value;
    project.description = this.entityForm.controls['description'].value;
    //project.clientId = this.entityForm.controls['clientId'].value;
    project.clientName = this.entityForm.controls['clientId'].value;
    project.hourlyRate = this.entityForm.controls['hourlyRate'].value;
    project.start = this.entityForm.controls['startDate'].value;
    project.end = this.entityForm.controls['endDate'].value;

    this.projectService.addProject(project).subscribe( (c) => {
      console.log("project sent");
      console.log(project);
      this.router.navigate(['/projects']);   // TODO
    });
  }

  back() {
    this.router.navigate(['/projects'])
  }










}
