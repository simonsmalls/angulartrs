import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:"/login", pathMatch:'full'},
  {path:'invoices', loadChildren:()=> import('./modules/invoice/invoice.module').then((m)=>m.InvoiceModule)},
  {path:'agenda', loadChildren:()=> import('./modules/agenda/agenda.module').then((m)=>m.AgendaModule)},
  {path:'time-registration', loadChildren:()=> import('./modules/time-registration/time-registration.module').then((m)=>m.TimeRegistrationModule)},
  {path:'salaries', loadChildren:()=> import('./modules/salaries/salaries.module').then((m)=>m.SalariesModule)},
  {path:'', redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
