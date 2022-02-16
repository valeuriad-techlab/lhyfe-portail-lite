
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-vertical-axis-filter',
  templateUrl: './vertical-axis-filter.component.html',
  styleUrls: ['./vertical-axis-filter.component.sass']
})
export class VerticalAxisFilterComponent implements OnInit {

  filterAxisForm = new FormGroup({
    displayTemperature: new FormControl(true),
    displayPressure: new FormControl(true)
  })

  @Output() changeFilterAxis = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.changeFilterAxis.emit(this.filterAxisForm.value);
    this.filterAxisForm.valueChanges.subscribe(value => {
      this.changeFilterAxis.emit(value);
    })
  }

}
