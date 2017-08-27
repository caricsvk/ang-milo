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
	@Input()
	fluid = false;
	@Input()
	name = "";

	private jqueryDropdown: any;

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
		if (this.name) {
			this.el.nativeElement.getElementsByTagName('select')[0].setAttribute('name', this.name);
		}
		if (jQuery) {
			let dropdown:any = jQuery(this.el.nativeElement);
			if (dropdown.dropdown) {
				this.jqueryDropdown = dropdown.find('select');
				this.jqueryDropdown.dropdown({
					fullTextSearch: true
				});
				// 	onChange: function (value) {
				// 		console.log('changeee', value);
				// 	}
				if (this.model) {
					setTimeout(() => this.jqueryDropdown.dropdown('set selected', this.getLabel(this.model)));
				}
			}
		}
	}

	public getLabel = (value) => value;

	public change() {
		this.onChange.emit(this.model);
		if (this.jqueryDropdown) {
			jQuery(':focus').blur();
		}
	}

}
