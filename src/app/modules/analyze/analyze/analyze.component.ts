import {Component, Inject} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {ActivityService} from "../../../service/activity.service";
import {CategoryService} from "../../../service/category.service";
import {ProjectService} from "../../../service/project.service";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AnalyzeService} from "../../../service/analyze.service";
import {MatTableDataSource} from "@angular/material/table";
import {Activity} from "../../../model/activity.model";
import {AnalyzeDTO} from "../../../model/analyze-dto";
import {Company} from "../../../model/company.model";
import {Project} from "../../../model/project.model";
import {Employee} from "../../../model/employee.model";
import {EmployeeService} from "../../../service/employee.service";
import {CompanyService} from "../../../service/company.service";
import {AnalyzeForm} from "../../../model/analyze-form";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent {
  dataSource = new MatTableDataSource<AnalyzeDTO>();
  myControl = new FormControl('');
  entityForm: FormGroup;
  clients:Company[];
  projects:Project[];
  employees:Employee[];
  analysis:AnalyzeDTO[];
  displayedColumns: string[] = ['category','tijd','percentage','money'];
  tableready:boolean=false;
  optionsProjects: string[]
  filteredOptionsProjects: Observable<string[]>;
  optionsEmployees: string[]
  filteredOptionsEmployees: Observable<string[]>;


  constructor(
    private authService:AuthService,
    private employeeService:EmployeeService,
    private projectService:ProjectService,
    private companyService:CompanyService,

    private analyzeService:AnalyzeService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private router:Router,
    private fb:FormBuilder,
  ) {}

  ngOnInit(){
    this._locale='nl';
    this._adapter.setLocale(this._locale);

    this.projectService.getAll().subscribe((c)=>{
      this.projects=c;
      this.optionsProjects=this.projects.map(x=>x.name);
      this.optionsProjects.push('intern')
      this.filteredOptionsProjects = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '',this.optionsProjects)),
      );



    })
/*
    this.companyService.getAll().subscribe((c)=>{
      this.clients=c;

    })

 */

    this.employeeService.allEmployees().subscribe((c)=>{
      this.employees=c;
      this.optionsEmployees=this.employees.map(x=>x.firstName +' '+x.lastName);
      this.filteredOptionsEmployees = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '',this.optionsEmployees)),
      );


    })



    this.entityForm=this.fb.group({
      startdate: [null],
      enddate: [null],
      client: [null],
      project: [null],
      employee: [null],

    })



  }
  private _filter(value: string,options:string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  getProjectByName(name:String):number{

    for(let project of this.projects){
      if (name==project.name) {
        return project.id
      }
      if(name=='intern'){
        return -1;
      }
    }

    return null;
  }
  getEmployeeByName(name:String):number{

    for(let employee of this.employees){
      if (name==(employee.firstName+' '+employee.lastName)) {
        return employee.id
      }
    }

    return null;
  }
  analyze(){

    let form:AnalyzeForm=new AnalyzeForm();
    form.start= this.entityForm.controls['startdate'].value
    form.end= this.entityForm.controls['enddate'].value
    if(form.start!=null && form.end!=null) {
      form.start.setHours(1, 1, 1, 1);
      form.end.setHours(1,1,1,1);
    }

    form.client_Id= this.entityForm.controls['client'].value
    let projectName=this.entityForm.controls['project'].value;
    form.project_Id= this.getProjectByName(projectName);
    let employeename=this.entityForm.controls['employee'].value;
    form.employee_Id= this.getEmployeeByName(employeename)

    this.analyzeService.analyze(form).subscribe((c)=>{
      this.analysis=c;
      this.dataSource.data=c;
      this.tableready=true;

    }
    )
  }

}
