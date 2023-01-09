import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'agenda', loadChildren:()=> import('./modules/agenda/agenda.module').then((m)=>m.AgendaModule)},
  {path:'time-registration', loadChildren:()=> import('./modules/time-registration/time-registration.module').then((m)=>m.TimeRegistrationModule)},
  {path:'salaries', loadChildren:()=> import('./modules/salaries/salaries.module').then((m)=>m.SalariesModule)},
  {path:'analyze', loadChildren:()=> import('./modules/analyze/analyze.module').then((m)=>m.AnalyzeModule)},
  {path: 'projects', loadChildren:()=> import('./modules/projects/projects.module').then((m)=>m.ProjectsModule)},
  {path:'', redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
