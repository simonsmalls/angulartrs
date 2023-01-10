import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProjectsComponent} from "./projects/projects.component";
import {AddProjectComponent} from "./add-project/add-project.component";

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'add', component: AddProjectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

