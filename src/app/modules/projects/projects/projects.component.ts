import {Component, OnInit} from '@angular/core';
import {Project} from "../../../model/project.model";
import {ProjectService} from "../../../service/project.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "../../../model/employee.model";
import {
  DialogOverviewExampleDialog
} from "../../agenda/dialog-overview-example-dialog/dialog-overview-example-dialog.component";
import {DateDTO} from "../../../model/date-dto";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  dataSource = new MatTableDataSource<Project>();
  displayedColumns: string[] = ["name", "client", "description", "hourlyRate", "actions"]; // TODO "actions"?
  entityForm: FormGroup;
  user:Employee;
  date:Date;
  dateDTO:DateDTO=new DateDTO();
  datum:string;

  constructor(
    private authService:AuthService,
    private projectService:ProjectService,
    private router:Router,
    private fb:FormBuilder,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.user = this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);
    this.date = new Date();   // TODAY
    this.dateDTO.year = this.date.getFullYear()
    this.dateDTO.month = this.date.getMonth() + 1;
    this.dateDTO.day= this.date.getDate();
    this.datum = this.dateDTO.day+'/'+this.dateDTO.month+'/'+this.dateDTO.year;
    this.projectService.getAllOngoing().subscribe( (c) => {
        this.projects = c;
        this.dataSource.data = c;
      }
    )
 //   this.entityForm = this.fb.group( {this.date} );

  }

  connected():boolean {
    return this.authService.connectedUser != null;
  }

  add(){
    this.router.navigate(['/projects/add'])
  }






  /*dataSource: Project[];
  displayedColumns: string[];

  constructor(private projectService : ProjectService) {
  }

  ngOnInit(): void {    // TODO "actions"???, clientId -> ClientName, addProject
    this.displayedColumns = ["name", "client", "description", "hourlyRate", "actions"]; // TODO "actions"?
    this.projectService.getAllOngoing().subscribe((projects) => { this.dataSource = projects;} )
  }*/

}
