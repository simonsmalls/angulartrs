import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Employee} from "../../../model/employee.model";
import {Router} from "@angular/router";
import {Project} from "../../../model/project.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DateDTO} from "../../../model/date-dto";
import {InvoiceService} from "../../../service/invoice.service";
import {Invoice} from "../../../model/invoice.model";
import {MatTableDataSource} from "@angular/material/table";
import {Activity} from "../../../model/activity.model";
import {generateEntryPoints} from "@angular-devkit/build-angular/src/utils/package-chunk-sort";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{

  projects: Array<Project>;
  filteredProjects: Array<Project>;
  entityForm: FormGroup;
  user:Employee;
  invoices: Array<Invoice>;
  ongoingInvoices: Array<Invoice>;
  historyInvoices: Array<Invoice>;
  projectId: number;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router:Router,
    private authService:AuthService,
    private invoiceService: InvoiceService,

  ) {
  }

  ngOnInit(): void {
    this.user=this.authService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);

    this.projectService.getAllOngoing().subscribe(p => {
      this.projects = p;
      this.filteredProjects = this.projects;

      for (const project of this.projects) {
        try {
          this.invoiceService.updateProjectInvoice(project.id).subscribe();
        } catch (error) {
          console.log("geen factuur gevonden voor vorige maand")
        }

      }
    });


    this.entityForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });


  }
  connected():boolean{
    if(this.authService.connectedUser==null){
      return false
    }
    return true;
  }

  submit() {
    let startDate :Date= this.entityForm.value.startDate;
    let endDate:Date= this.entityForm.value.endDate;
    this.ongoingInvoices = null;
    this.historyInvoices = null;
    if (startDate == null || endDate == null) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => {
        let backendStartDate = new Date(project.start);
        let backendEndDate = new Date(project.end);
        return backendStartDate >= startDate && backendEndDate <= endDate;
      })
    }
  }


  showInvoices(projectId: number) {

    this.invoiceService.getAllInvoicesOfId(projectId).subscribe(i =>{
      this.ongoingInvoices = i.filter(invoice => invoice.closed === false);
      this.historyInvoices = i.filter(invoice => invoice.closed === true);
    })

  }

  finalise(invoiceId: number) {

    this.invoiceService.finaliseInvoice(invoiceId).subscribe(i=> {
      console.log("invoice closed")
    })
    this.showInvoices(this.projectId);
  }

  checkMonthly(){
    this.router.navigate(['/month'])
  }


}
