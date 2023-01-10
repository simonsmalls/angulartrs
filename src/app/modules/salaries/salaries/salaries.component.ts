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
  month: string;
  monthNames: string[] = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september",
  "oktober", "november", "december"];

  constructor(
    private consultantService: ConsultantService,
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = ["abbreviation", "name", "salary", "minutesWorked", "hourlyRate"];
    let date = new Date();
    //TODO uncomment in production: should show previous month, right now it shows current month
    this.month = this.monthNames[date.getMonth()];
    // get the month before (make sure it gets the right year in case it's january)
    //date.setMonth(date.getMonth() - 1);
    // + 1 because month is a zero-based value (&Java dates it is not)

    this.consultantService.getSalariesForAllConsultantsForYearAndMonth(date.getFullYear(),
      date.getMonth()+1).subscribe(
      (salaries) => {
        this.dataSource = salaries;
      }
    )
  }

}
