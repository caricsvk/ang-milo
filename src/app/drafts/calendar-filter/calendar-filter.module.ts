import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { CalendarFilterComponent } from './calendar-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    CalendarFilterComponent
  ],
  declarations: [
    CalendarFilterComponent
   ]
})
export class CalendarFilterModule {}
