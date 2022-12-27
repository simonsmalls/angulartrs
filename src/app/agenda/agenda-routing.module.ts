import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {path:'check', component:ScheduleComponent  },
  {path:'toevoegen', component:AddActivityComponent  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
