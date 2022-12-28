import {Component, Inject} from '@angular/core';
import {Activity} from "../../model/activity.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../service/employee.service";
import {ActivityService} from "../../service/activity.service";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {DateDTO} from "../../model/date-dto";
import {Project} from "../../model/project.model";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../service/category.service";
import {ProjectService} from "../../service/project.service";



@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {

  activities:Activity[];
  dataSource = new MatTableDataSource<Activity>();
  entityForm: FormGroup;
  datum:string;
  user=this.employeeService.connectedUser;
  projects:Project[];
  categories:Category[];


  constructor(
    private employeeService:EmployeeService,
    private activityService:ActivityService,
    private categoryService:CategoryService,
    private projectService:ProjectService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private router:Router,
    private fb:FormBuilder,
  ) {



  }

  ngOnInit(): void {
    this._locale='fr';
    this._adapter.setLocale(this._locale);



    this.entityForm=this.fb.group({
      date: [null,Validators.required],
      starttime: [null,Validators.required],
      endtime: [null,Validators.required],
      category: [null,Validators.required],
      project: [null,Validators.required],
      name: [null],
      description: [null],


    })

    this.categoryService.getAll().subscribe((c)=>{
      this.categories=c;
    })

    this.projectService.getAllOngoing().subscribe((c)=>{
      this.projects=c;
      console.log(this.projects)
    })

  }

  datePick(){
    let date=this.entityForm.controls['date'].value;
    console.log('date is picked')
  }

  add() {
    let activity = new Activity();
    activity.categoryName = this.entityForm.controls['category'].value;
    if (this.user != null) {

    activity.employeeId = this.user.id
    activity.employeeName = this.user.firstName
  }
    activity.endTime=this.entityForm.controls['endtime'].value;
    activity.startTime=this.entityForm.controls['starttime'].value;
    activity.projectId=this.entityForm.controls['project'].value;
    activity.startDate=this.entityForm.controls['date'].value;
    activity.description=this.entityForm.controls['description'].value;


    this.activityService.addActivity(activity).subscribe((c)=>{
      console.log("activity send")
    });
  }

  back(){
    this.router.navigate(['agenda/check'])
  }

}
