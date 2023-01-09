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
  displayedColumns: string[] = ["name", "client", "description", "hourlyRate"]; // TODO "actions"?
  user:Employee;
  date:Date;
  datum:string;

  constructor(
    private authService:AuthService,
    private projectService:ProjectService,
    private router:Router,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.user = this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);
    this.date = new Date();   // TODAY
    this.projectService.getAllOngoing().subscribe( (c) => {
        this.projects = c;
        this.dataSource.data = c;
      }
    )

  }

  connected():boolean {
    return this.authService.connectedUser != null;
  }

  add(){
    this.router.navigate(['/projects/add'])
  }


}
