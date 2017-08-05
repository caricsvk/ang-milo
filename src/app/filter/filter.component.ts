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
	}

	ngOnInit():void {
		if (this.column.type == 'boolean' && typeof this.value != 'boolean' && this.value) {
			this.value = this.value == 'true' ? true : false;
		}
	}

	public emitChange(value:any):void {
		this.onChange.emit(value);
	}

}
