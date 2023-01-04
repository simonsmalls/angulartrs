import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";


@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModuleModule,
  ]
})
export class InvoiceModule { }
