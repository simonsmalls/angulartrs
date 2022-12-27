import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import {TimeRegistrationRoutingModule} from "./time-registration-routing.module";



@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    CommonModule,
    TimeRegistrationRoutingModule,
  ]
})
export class TimeRegistrationModule { }
