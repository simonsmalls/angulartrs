import {Component, OnInit} from '@angular/core';
import {Project} from "../../../model/project.model";
import {ProjectService} from "../../../service/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  dataSource: Project[];
  displayedColumns: string[];

  constructor(private projectService : ProjectService) {
  }

  ngOnInit(): void {    // TODO "actions"???, clientId -> ClientName, addProject
    this.displayedColumns = ["name", "client", "description", "hourlyRate", "actions"]; // TODO "actions"?
    this.projectService.getAllOngoing().subscribe((projects) => { this.dataSource = projects;} )
  }

}
