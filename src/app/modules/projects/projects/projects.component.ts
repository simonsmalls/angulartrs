import {Component, OnInit} from '@angular/core';
import {Project} from "../../../model/project.model";
import {ProjectService} from "../../../service/project.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  filteredOngoingProjects: Array<Project>;
  ongoingProjects: Array<Project>;
  filteredAllProjects: Array<Project>;
  allProjects: Array<Project>;
  entityForm: FormGroup;
  user: Employee;
  displayedColumns: string[] = ['projectName', 'clientName', 'description', 'hourlyRate'];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);
    this.projectService.getAllOngoing().subscribe((p) => {
        this.ongoingProjects = p;
        this.filteredOngoingProjects = this.ongoingProjects;
      }
    )
    this.allProjects = null;

    this.entityForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });

  }

  connected(): boolean {
    return this.authService.connectedUser != null;
  }

  add() {
    this.router.navigate(['/projects/add'])
  }

  submit() {
    let startDate :Date= this.entityForm.value.startDate;
    let endDate:Date= this.entityForm.value.endDate;

    this.projectService.getAll().subscribe((p) => {
      this.allProjects = p;
    })

    if (startDate == null || endDate == null) {
      this.filteredAllProjects = null;
      this.filteredOngoingProjects = this.ongoingProjects;
    } else {
      this.filteredOngoingProjects = null;
      this.filteredAllProjects = this.allProjects.filter(project => {
        let backendStartDate = new Date(project.start);
        let backendEndDate = new Date(project.end);
        return ((startDate < backendStartDate && (endDate => backendStartDate && endDate <= backendEndDate)) ||
          ((startDate >= backendStartDate && startDate <= backendEndDate) && (endDate >= backendEndDate)) ||
          (startDate >= backendStartDate && endDate <= backendEndDate) || (startDate <= backendStartDate && endDate >= backendEndDate)
        );
      })
    }
  }
}


