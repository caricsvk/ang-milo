import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'milo-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

	@Output() onChange = new EventEmitter<any>();
	
	@Input()
	public model: any;
	@Input()
	public options: any[];
	@Input()
	public value: any; // string key or function which modifies option

	constructor() {
	}

	ngOnInit() {
		if (typeof this.value === 'string') {
			this.getLabel = (option) => option[this.value];
		} else if (typeof this.value === 'function') {
			this.getLabel = this.value;
		}
	}

	public getLabel = (value) => value;

	public change() {
		this.onChange.emit(this.model);
	}

}
