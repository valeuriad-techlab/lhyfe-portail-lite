import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sensor } from '../models/sensor';
import { Site } from '../models/site';

@Component({
  selector: 'app-site-filter',
  templateUrl: './site-filter.component.html',
  styleUrls: ['./site-filter.component.sass']
})
export class SiteFilterComponent implements OnInit {

  constructor() { }

  @Input() public site!: Site;
  @Input() public sensors!: Sensor[];
  @Output() deleteSensorEvent = new EventEmitter<Sensor>();

  ngOnInit(): void {

  }

  remove(sensorToDelete: Sensor) {
    this.deleteSensorEvent.emit(sensorToDelete)
    this.sensors = this.sensors.filter(sensor => sensor !== sensorToDelete)
  }

}
