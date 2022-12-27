import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddActivityComponent } from './add-activity/add-activity.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    AddActivityComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule
  ]
})
export class AgendaModule { }
