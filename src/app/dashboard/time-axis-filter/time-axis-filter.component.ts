import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

enum Periodes {
  selection = 0,
  day = 1,
  week = 7,
  month = 30,
  twoMonth = month * 2,
}
@Component({
  selector: 'app-time-axis-filter',
  templateUrl: './time-axis-filter.component.html',
  styleUrls: ['./time-axis-filter.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class timeAxisFilterComponent implements OnInit {

  periodSelect = new FormControl();
  periodList = [
    { value: Periodes[Periodes.selection], viewValue: $localize `Date selection` },
    { value: Periodes[Periodes.day], viewValue: $localize `Last 24 hours` },
    { value: Periodes[Periodes.week], viewValue: $localize`Last 7 days` },
    { value: Periodes[Periodes.month], viewValue: $localize `Last 30 days` },
    { value: Periodes[Periodes.twoMonth], viewValue: $localize `Last 60 days` }
  ];

  @Output() changeDisplayRange = new EventEmitter();
  constructor() {
  }

  range = new FormGroup({
    start: new FormControl('', {validators: [Validators.required], updateOn: 'blur' }),
    end: new FormControl('', {validators: [Validators.required], updateOn: 'blur' }),
  });

  ngOnInit(): void {
    this.periodSelect.valueChanges.subscribe(value => {
      const selectedPeriod = parseInt(Periodes[value]);
      if (value !== Periodes[Periodes.selection]) {
        this.range.setValue({
          start: moment().subtract(selectedPeriod, 'days'),
          end: moment()
        })
      } else {

        this.range.setValue({
          start: moment().subtract(1, 'day'),
          end: moment()
        })
      }
    });

    this.range.valueChanges.subscribe(value => {
      if (this.range.valid) {
        //We cannot emit moment values to the dashboard
        const startDate = new Date(this.range.value.start.toString());
        const endDate = new Date(this.range.value.end.toString());
        this.changeDisplayRange.emit({start: startDate, end: endDate})
      }
    });

    //periodSelect is initialized to 24h
    this.periodSelect.setValue(Periodes[Periodes.day]);
  }
}
