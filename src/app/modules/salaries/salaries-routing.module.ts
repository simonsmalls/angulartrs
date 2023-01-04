import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SalariesComponent} from "./salaries/salaries.component";

const routes: Routes = [
  {path: '', component: SalariesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalariesRoutingModule { }
