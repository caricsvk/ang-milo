import {Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';

declare var jQuery: any;

@Component({
	selector: 'milo-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, AfterViewInit {

	@Output() onChange = new EventEmitter<any>();
	
	@Input()
	public model: any;
	@Input()
	public options: any[];
	@Input()
	public value: any; // string key or function which modifies option

	constructor(private el:ElementRef) {
	}

	ngOnInit() {
		if (typeof this.value === 'string') {
			this.getLabel = (option) => option[this.value];
		} else if (typeof this.value === 'function') {
			this.getLabel = this.value;
		}
	}

	ngAfterViewInit() {
		if (jQuery) {
			let dropdown:any = jQuery(this.el.nativeElement);
			if (dropdown.dropdown) {
				console.log('init', dropdown, this.options);
				dropdown.find('select').dropdown({
					fullTextSearch: true
				});
				// 	onChange: function (value) {
				// 		console.log('changeee', value);
				// 	}
			}
			// TODO
			// dropdown.dropdown('set selected', this.request.requestMainInfo.preferredTime);
		}
	}

	public getLabel = (value) => value;

	public change() {
		this.onChange.emit(this.model);
	}

}
