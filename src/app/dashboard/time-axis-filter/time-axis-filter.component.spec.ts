import { ComponentFixture, TestBed } from '@angular/core/testing';

import { timeAxisFilterComponent } from './time-axis-filter.component';

describe('DisplayPeriodComponent', () => {
  let component: timeAxisFilterComponent;
  let fixture: ComponentFixture<timeAxisFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ timeAxisFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(timeAxisFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
