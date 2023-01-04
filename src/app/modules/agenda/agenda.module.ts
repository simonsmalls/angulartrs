import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import {MaterialModule} from "../shared-module/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ScheduleComponent,
    AddActivityComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AgendaModule { }
