import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import { SalariesComponent } from './salaries/salaries.component';
import {SalariesRoutingModule} from "./salaries-routing.module";



@NgModule({
  declarations: [
    SalariesComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    SalariesRoutingModule,
  ]
})
export class SalariesModule { }
