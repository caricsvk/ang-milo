import {Component, OnInit, Input} from '@angular/core';

@Component({
	selector: '[milo-input]',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

	@Input() public model: any;
	@Input() public name: string;
	@Input() public label: string;
	@Input() public type: string = 'text';
	@Input() public fieldClass: string = 'field';
	public id: string;

	constructor() {
	}

	ngOnInit() {
		this.id = 'milo-input-' + this.name;
		if (this.label === undefined) {
			this.label = this.name;
		}
	}

}
