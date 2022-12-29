import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import {TimeRegistrationRoutingModule} from "./time-registration-routing.module";
import {MaterialModule} from "../shared/material/material.module";

@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    CommonModule,
    TimeRegistrationRoutingModule,
    MaterialModule,
  ]
})
export class TimeRegistrationModule { }
