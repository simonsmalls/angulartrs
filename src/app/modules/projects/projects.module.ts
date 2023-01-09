import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectsComponent} from "./projects/projects.component";
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {ProjectsRoutingModule} from "./projects-routing.module";
import {MaterialModule} from "../shared-module/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { AddProjectComponent } from './add-project/add-project.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    ProjectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
