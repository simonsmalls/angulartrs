import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimerComponent} from "./timer/timer.component";

const routes: Routes = [
  {path: 'timer', component: TimerComponent},
  {path: '', redirectTo: '/time-registration/timer', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeRegistrationRoutingModule { }
