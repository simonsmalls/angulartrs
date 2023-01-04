import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minsToHrMins'
})
export class MinsToHrMinsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {

    let hours = Math.floor(value/60);
    let mins = value%60;

    if (hours == 0 && mins == 0) return "nog steeds open";
    else if (hours != 0 && mins ==0) return hours + " uur";

    return (hours == 0 ? mins + " mins" : hours + " uur " + mins + " mins");
  }

}
