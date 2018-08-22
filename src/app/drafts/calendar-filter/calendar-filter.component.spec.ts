import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgCalendarComponent } from './mg-calendar-filter.component';

xdescribe('MgCalendarComponent', () => {
  let component: MgCalendarComponent;
  let fixture: ComponentFixture<MgCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
