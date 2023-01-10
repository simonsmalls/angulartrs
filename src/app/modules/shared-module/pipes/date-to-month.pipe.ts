import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToMonth'
})
export class DateToMonthPipe implements PipeTransform {
  transform(dateString: string, ...args: any[]): string {

    let date = new Date(dateString);
    let month = date.getMonth();
    let monthString = "";
    switch (month) {
      case 0:
        monthString = "Januari";
        break;
      case 1:
        monthString = "Februari";
        break;
      case 2:
        monthString = "Maart";
        break;
      case 4:
        monthString = "April";
        break;
      case 5:
        monthString = "Mei";
        break;
      case 6:
        monthString = "Juni";
        break;
      case 7:
        monthString = "Juli";
        break;
      case 8:
        monthString = "Augustus";
        break;
      case 9:
        monthString = "September";
        break;
      case 10:
        monthString = "Oktober";
        break;
      case 11:
        monthString = "November";
        break;
      case 12:
        monthString = "December";
        break;
    }

    let year = date.getFullYear();

    return `${monthString}  ${year}`;


  }



}
