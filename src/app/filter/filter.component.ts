import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {TableColumn} from "../table/table-column";

@Component({
	selector: 'milo-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {

	@Input()
	public column:TableColumn;
	@Input()
	public value:any;
	@Output()
	public onChange = new EventEmitter<any>();

	constructor() {
	}

	ngOnChanges(changes:SimpleChanges):void {
		if (this.column.type == 'boolean') {
			this.value = this.convertBooleanValue(this.value);
		}
	}

	private convertBooleanValue(value: any): boolean {
		switch (value) {
			case 'true':
				return true;
			case 'false':
				return false;
			case 'null':
				return null;
			default:
				return value;
		}
	}

	public emitChange(value:any):void {
		this.onChange.emit(value);
	}

}
