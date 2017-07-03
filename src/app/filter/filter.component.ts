import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TableColumn} from "../table/table-column";

@Component({
	selector: 'milo-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

	@Input()
	public column:TableColumn;
	@Input()
	public value:any;
	@Output()
	public onChange = new EventEmitter<any>();

	constructor() {
		console.log('MiloTableFilterComponent', this.column, 'x', this);
	}

	ngOnInit():void {
	}

	public emitChange(value:any):void {
		this.onChange.emit(value);
	}

}