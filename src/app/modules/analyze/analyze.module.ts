import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { AnalyzeComponent } from './analyze/analyze.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";


@NgModule({
  declarations: [
    AnalyzeComponent
  ],
    imports: [
        CommonModule,
        AnalyzeRoutingModule,
        SharedModuleModule
    ]
})
export class AnalyzeModule { }
