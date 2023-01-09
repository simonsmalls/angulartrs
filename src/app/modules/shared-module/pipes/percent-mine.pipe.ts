import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentMine'
})
export class PercentMinePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    value.toString()
    return value.toString() +'%';
  }

}
