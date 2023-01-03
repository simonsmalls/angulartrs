import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {ActivityComponent} from "./activity/activity.component";

const routes: Routes = [
  {path:'check', component:ScheduleComponent  },
  {path:'toevoegen', component:ActivityComponent },
  {path: '', redirectTo: '/agenda/check', pathMatch:'full'},
  { path: ':id/edit', component: ActivityComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
