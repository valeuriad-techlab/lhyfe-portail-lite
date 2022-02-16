import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

enum RefreshInterval {
  manually = 0,
  fiveMinutes = 300000,
  fifteenMinutes = 900000,
  thirtyMinutes = 1800000,
}
@Component({
  selector: 'app-update-period',
  templateUrl: './update-period.component.html',
  styleUrls: ['./update-period.component.sass']
})
export class UpdatePeriodComponent implements OnInit {
  periodRefreshList = [
    { value: RefreshInterval[RefreshInterval.manually], viewValue: $localize `manually` },
    { value: RefreshInterval[RefreshInterval.fiveMinutes], viewValue: $localize `every 5 minutes` },
    { value: RefreshInterval[RefreshInterval.fifteenMinutes], viewValue: $localize `every 15 minutes` },
    { value: RefreshInterval[RefreshInterval.thirtyMinutes], viewValue: $localize `every 30 minutes` },
  ];
  selectPeriodRefresh = new FormControl(RefreshInterval[RefreshInterval.manually]);
  @Output() changePeriodUpdate = new EventEmitter();

  constructor() { }


  ngOnInit(): void {
    this.selectPeriodRefresh.valueChanges.subscribe(value => {
      this.changePeriodUpdate.emit(RefreshInterval[value])
    })

  }

  refreshManually() {
    this.changePeriodUpdate.emit(0);
  }
}
