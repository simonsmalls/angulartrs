import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MinsToHrMinsPipe} from "./pipes/mins-to-hr-mins.pipe";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PercentMinePipe } from './pipes/percent-mine.pipe';
import { DateToMonthPipe } from './pipes/date-to-month.pipe';
import { TruncateMinutesPipe } from './pipes/truncate-minutes.pipe';



@NgModule({
  declarations: [
    MinsToHrMinsPipe,
    PercentMinePipe,
    DateToMonthPipe,
    TruncateMinutesPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MinsToHrMinsPipe,
    PercentMinePipe,
    TruncateMinutesPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DateToMonthPipe,
  ]
})
export class SharedModuleModule { }
