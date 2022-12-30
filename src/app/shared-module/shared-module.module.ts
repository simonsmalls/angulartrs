import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MinsToHrMinsPipe} from "./pipes/mins-to-hr-mins.pipe";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MinsToHrMinsPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MinsToHrMinsPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModuleModule { }
