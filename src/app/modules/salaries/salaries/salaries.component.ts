import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../model/employee.model";
import {ConsultantService} from "../../../service/consultant.service";
import {ConsultantSalary} from "../../../model/consultant-salary.model";

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css']
})
export class SalariesComponent implements OnInit{
  dataSource: ConsultantSalary[];
  displayedColumns:string[];

  constructor(
    private consultantService: ConsultantService,
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = ["abbreviation", "name", "salary", "minutesWorked"];
    let date = new Date();
    // get the month before (make sure it gets the right year in case it's january)
    date.setMonth(date.getMonth() - 1);
    // + 1 because month is a zero-based value (&Java dates it is not)
    this.consultantService.getSalariesForAllConsultantsForYearAndMonth(date.getFullYear(),
      date.getMonth()+1).subscribe(
      (salaries) => {
        this.dataSource = salaries;
      }
    )
  }

}
