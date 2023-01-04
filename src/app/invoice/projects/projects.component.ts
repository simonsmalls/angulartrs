import {Component, OnInit} from '@angular/core';
import {OathService} from "../../service/oath.service";
import {Employee} from "../../model/employee.model";
import {Router} from "@angular/router";
import {Project} from "../../model/project.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProjectService} from "../../service/project.service";
import {DateDTO} from "../../model/date-dto";
import {InvoiceService} from "../../service/invoice.service";
import {Invoice} from "../../model/invoice.model";

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
    private oathService:OathService,
    private invoiceService: InvoiceService,
  ) {
  }

  ngOnInit(): void {
    this.user=this.oathService.connectedUser;
    if (this.user == null) this.router.navigate(["/login"]);

    this.projectService.getAllOngoing().subscribe(p => {
      this.projects = p;
      this.filteredProjects = this.projects;
    });

    this.entityForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });


  }
  connected():boolean{
    if(this.oathService.connectedUser==null){
      return false
    }
    return true;
  }

  submit() {
    let startDate = this.entityForm.value.startDate;
    let endDate = this.entityForm.value.endDate;
    this.ongoingInvoices = null;
    this.historyInvoices = null;
    if (startDate == null || endDate == null) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => {
        return project.start >= startDate && project.end <= endDate;
      })
    }
  }


  showInvoices(projectId: number) {

    this.invoiceService.getAllInvoicesOfId(projectId).subscribe(i =>{
      this.ongoingInvoices = i.filter(invoice => invoice.closed === false);
      console.log("test")
      this.historyInvoices = i.filter(invoice => invoice.closed === true);
      console.log(this.historyInvoices[0].projectName)
    })

  }

  finalise(invoiceId: number) {

    this.invoiceService.finaliseInvoice(invoiceId).subscribe(i=> {
      console.log("invoice closed")
    })
    this.showInvoices(this.projectId);
  }
}
