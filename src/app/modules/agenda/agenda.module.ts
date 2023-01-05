import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import {MaterialModule} from "../shared-module/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    AddActivityComponent,
    DialogOverviewExampleDialog,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AgendaModule { }
