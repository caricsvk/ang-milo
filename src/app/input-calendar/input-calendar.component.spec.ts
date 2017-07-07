import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCalendarComponent } from './input-calendar.component';

describe('InputCalendarComponent', () => {
  let component: InputCalendarComponent;
  let fixture: ComponentFixture<InputCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});