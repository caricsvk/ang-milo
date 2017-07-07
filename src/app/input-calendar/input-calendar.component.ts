import {Component, Input, Output, EventEmitter, AfterViewInit, ElementRef} from "@angular/core";

declare var jQuery: any;

@Component({
	selector: 'milo-input-calendar',
	templateUrl: './input-calendar.component.html',
	styleUrls: ['./input-calendar.component.css']
})
export class InputCalendarComponent implements AfterViewInit {

	@Input() name: string = "calendar";
	@Input() type: string = "datetime";
	@Input() placeholder: string = "";
	@Input() value: Date = null;
	@Input() minDate: Date = null;
	@Input() loading: boolean = false;

	@Output() onChange = new EventEmitter<ChangeEvent>();

	private calendarEl: any;

	constructor(private el:ElementRef) {
	}

	ngAfterViewInit() {

		this.calendarEl = jQuery(this.el.nativeElement);
		let self = this;
		let lastValue: Date = null;
		this.calendarEl.calendar({
			type: this.type,
			minDate: this.minDate,
			// inline: true
			onChange: function (value: Date, text: any) {
				lastValue = value;
			},
			onHidden: function () {
				self.onChange.emit(new ChangeEvent(lastValue));
			},
		});

		this.ngOnChanges();
	}

	ngOnChanges(): void {
		if (this.calendarEl) {
			if (this.value) {
				let value = typeof this.value === 'string' ? new Date(this.value) : this.value;
				this.calendarEl.calendar('set date', value, true, false);
			} else {
				this.calendarEl.calendar('clear');
			}
		}
	}

	public focusCalendar(): void {
		this.calendarEl.calendar('focus');
	}

}

class ChangeEvent {

	constructor(private date: Date) {
	}

	public getDate(): Date {
		return this.date;
	}

	public getLocalDateTime(): string {
		return !this.date ? ""
			: new Date(this.date.getTime() - this.date.getTimezoneOffset()*60*1000).toISOString().substr(0, 19);
	}
}
