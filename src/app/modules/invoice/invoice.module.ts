import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModuleModule} from "../shared-module/shared-module.module";
import {InvoiceRoutingModule} from "./invoice-routing.module";
import {ProjectsComponent} from "./projects/projects.component";

@NgModule({
  declarations: [
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModuleModule,
  ]
})
export class InvoiceModule { }
