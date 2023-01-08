import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MinsToHrMinsPipe} from "./pipes/mins-to-hr-mins.pipe";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PercentMinePipe } from './pipes/percent-mine.pipe';
import { TimeStringPipe } from './pipes/time-string.pipe';



@NgModule({
  declarations: [
    MinsToHrMinsPipe,
    PercentMinePipe,
    TimeStringPipe,

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
    TimeStringPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModuleModule { }
