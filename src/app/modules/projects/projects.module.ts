import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectsComponent} from "./projects/projects.component";
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {ProjectsRoutingModule} from "./projects-routing.module";



@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
