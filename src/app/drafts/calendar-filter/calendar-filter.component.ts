import {
  Component, OnInit, ElementRef, HostListener, Input, Output, EventEmitter
} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mg-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss'],
  providers: [DatePipe]
})

export class CalendarFilterComponent implements OnInit{

  @Input() placeholder: string;
  @Input() startDate: Date;
  @Input() endDate: Date;

  @Output() valuesChanges = new EventEmitter<CalendarValues>();

  showCalendar: boolean;

  constructor(
    private datePipe: DatePipe,
    private elementRef: ElementRef) {
  }

  static get DATE_FORMAT() {
    return 'MMM dd, yyyy';
  }

  ngOnInit() {
    this.showCalendar = false;
  }

  onToggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
    this.onDateChange();
  }

  setEndDate(endDate: Date) {
    this.endDate = endDate;
    this.onDateChange();
  }

  fullDateValue() {
    let result = '';
    if (this.startDate){
      result += this.datePipe.transform(this.startDate, CalendarFilterComponent.DATE_FORMAT);
    }
    if (this.endDate){
      if (this.startDate) {
        result += ' - ';
      }
      result += this.datePipe.transform(this.endDate, CalendarFilterComponent.DATE_FORMAT);
    }
    return result;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement) || !document.body.contains(targetElement);
    if (!clickedInside) {
      this.showCalendar = false;
    }
  }

  private onDateChange() {
    this.valuesChanges.next(new CalendarValues(this.startDate, this.endDate));
    // this is hack for MOV-24322 = min/max constraints for calendar lag 1 value behind
    setTimeout((): any => {
      this.endDate = this.endDate ? new Date(this.endDate.getTime()) : null;
      this.startDate = this.startDate ? new Date(this.startDate.getTime()) : null;
    });
  }

}

export class CalendarValues {
  constructor(
    public startDate: Date,
    public endDate: Date
  ) {}
}

