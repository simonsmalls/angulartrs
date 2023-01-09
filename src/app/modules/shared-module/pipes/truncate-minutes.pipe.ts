import { Pipe, PipeTransform } from '@angular/core';
import {parse} from "@angular/compiler-cli/linker/babel/src/babel_core";

@Pipe({
  name: 'truncateMinutes'
})
export class TruncateMinutesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const timepart= value.split(':');

    return timepart[0]+ ':'+ timepart[1];
  }

}
