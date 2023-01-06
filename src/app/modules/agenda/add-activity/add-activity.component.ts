import {Component, Inject, Input} from '@angular/core';
import {Activity} from "../../../model/activity.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivityService} from "../../../service/activity.service";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {Project} from "../../../model/project.model";
import {Category} from "../../../model/category.model";
import {CategoryService} from "../../../service/category.service";
import {ProjectService} from "../../../service/project.service";
import {AuthService} from "../../../service/auth.service";



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
  user=this.authService.connectedUser;
  projects:Project[];
  categories:Category[];
  @Input() activity:Activity;
  toevoegen:string;


  constructor(
    private authService:AuthService,
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
    this._locale='nl';
    this._adapter.setLocale(this._locale);



    this.entityForm=this.fb.group({
      date: [null,Validators.required],
      starttime: [null,Validators.required],
      endtime: [null,Validators.required],
      category: [null,Validators.required],
      project: [null],
      name: [null],
      description: [null],


    })
    this.toevoegen='toevoegen'
    this.categoryService.getAll().subscribe((c)=>{
      this.categories=c;
    })

    this.projectService.getAllOngoing().subscribe((c)=>{
      this.projects=c;

    })
    if (this.activity){
      this.entityForm.controls['endtime'].setValue(this.activity.endTime);
      this.entityForm.controls['starttime'].setValue(this.activity.startTime)
      this.entityForm.controls['project'].setValue(this.activity.projectId)
      this.entityForm.controls['date'].setValue(this.activity.startDate)
      this.entityForm.controls['description'].setValue(this.activity.description)
      this.entityForm.controls['category'].setValue(this.activity.categoryName);
      this.toevoegen='bewerken'
    }

  }

  datePick(){
    let date=this.entityForm.controls['date'].value;
    console.log('date is picked')
  }

  add() {
    if (this.activity==null) {
      let activity = new Activity();
      activity.categoryName = this.entityForm.controls['category'].value;
      if (this.user != null) {

        activity.employeeId = this.user.id
        activity.employeeName = this.user.firstName
      }
      activity.endTime = this.entityForm.controls['endtime'].value;
      activity.startTime = this.entityForm.controls['starttime'].value;
      activity.projectId = this.entityForm.controls['project'].value;
      activity.startDate = this.entityForm.controls['date'].value;
      activity.description = this.entityForm.controls['description'].value;

      activity.startDate.setHours(1,1,1);
      this.activityService.addActivity(activity).subscribe((c) => {
        console.log("activity send");
        console.log(activity)
        this.router.navigate(['/agenda/check'])
      });
    }else{
      this.activity.categoryName = this.entityForm.controls['category'].value;

      this.activity.endTime = this.entityForm.controls['endtime'].value;
      this.activity.startTime = this.entityForm.controls['starttime'].value;
      this.activity.projectId = this.entityForm.controls['project'].value;
      this.activity.startDate = this.entityForm.controls['date'].value;
      this.activity.description = this.entityForm.controls['description'].value;
    if(! (typeof(this.activity.startDate)== "string")){
    this.activity.startDate.setHours(1,1,1);}
      this.activityService.editActivity(this.activity).subscribe((c) => {
        console.log("activity send")
        this.router.navigate(['/agenda/check'])
      });
    }
  }

  back(){
    this.router.navigate(['agenda/check'])
  }

}
