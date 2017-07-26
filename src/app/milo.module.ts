import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {TableComponent} from './table/table.component';
import {FilterComponent} from './filter/filter.component';
import {MiloService} from "./milo.service";
import {MiloComponent} from "./milo.component";
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { InputCalendarComponent } from './input-calendar/input-calendar.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [
		MiloComponent,
		TableComponent,
		FilterComponent,
		InputComponent,
		SelectComponent,
		InputCalendarComponent,
		LoadingComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	exports: [
		TableComponent, InputComponent, SelectComponent, InputCalendarComponent, LoadingComponent
	],
	providers: [MiloService],
	bootstrap: [MiloComponent]
})
export class MiloModule {
}
