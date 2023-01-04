import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import {TimeRegistrationRoutingModule} from "./time-registration-routing.module";
import {SharedModuleModule} from "../shared-module/shared-module.module";

@NgModule({
  declarations: [
    TimerComponent
  ],
    imports: [
        CommonModule,
        TimeRegistrationRoutingModule,
        SharedModuleModule,
    ]
})
export class TimeRegistrationModule { }
