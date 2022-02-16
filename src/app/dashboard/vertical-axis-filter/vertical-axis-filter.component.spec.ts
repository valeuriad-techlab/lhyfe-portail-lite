import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalAxisFilterComponent } from './vertical-axis-filter.component';

describe('DisplayDataComponent', () => {
  let component: VerticalAxisFilterComponent;
  let fixture: ComponentFixture<VerticalAxisFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalAxisFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalAxisFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
