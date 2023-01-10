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
  invoices = new MatTableDataSource<Invoice>();
  ongoingInvoices = new MatTableDataSource<Invoice>();
  historyInvoices = new MatTableDataSource<Invoice>();
  projectId: number;
  displayedColumns: string[] = ['projectName','clientName','showInvoices'];
  displayedColumnsOngoingInvoices: string[] = ['clientName','projectName','date','totalPrice', 'finalise'];
  displayedColumnsClosedInvoices: string[] = ['clientName','projectName','date','totalPrice'];


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

    this.projectService.getAll().subscribe(p => {
      this.projects = p;
      this.filteredProjects = this.projects;
      console.log(this.filteredProjects.length + "nr of projects found")

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
  historyInvoicesCheck(){
    if(this.historyInvoices==null) return false

    return (this.historyInvoices.data.length>0)


  }
  ongoingInvoicesCheck(){
    if(this.ongoingInvoices==null) return false
    return (this.ongoingInvoices.data.length>0)


  }

  filteredProjectsCheck(){
    console.log(this.filteredProjects)
    if(this.filteredProjects==undefined) return false
    return (!(this.filteredProjects.length==0))


  }

  submit() {
    let startDate :Date= this.entityForm.value.startDate;
    let endDate:Date= this.entityForm.value.endDate;

    console.log(startDate)
    console.log(endDate)
    this.ongoingInvoices = null;
    this.historyInvoices = null;
    if (startDate == null || endDate == null) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => {
        let backendStartDate = new Date(project.start);
        let backendEndDate = new Date(project.end);

        return (backendStartDate.getTime() >= startDate.getTime() && backendEndDate.getTime() <= endDate.getTime());
      })

    }
  }


  showInvoices(projectId: number) {

    this.invoiceService.getAllInvoicesOfId(projectId).subscribe(i =>{
      this.ongoingInvoices.data = i.filter(invoice => invoice.closed === false);
      this.historyInvoices.data = i.filter(invoice => invoice.closed === true);
    })
    console.log(this.ongoingInvoices.data.length + " nr of of ongoing invoices");
    console.log(this.historyInvoices.data.length  + " nr of history invoices")

  }
  afterInvoiceDate(date):boolean{
    let datenow =new Date();
    let invoiceDate = new Date(date)
    console.log(invoiceDate)
    if (datenow.getTime() > invoiceDate.getTime()) return false

    return true
  }

  finalise(invoiceId: number) {

    this.invoiceService.finaliseInvoice(invoiceId).subscribe(i=> {
      console.log("invoice closed")
    })

  }

  checkMonthly(){
    this.router.navigate(['/month'])
  }


}
