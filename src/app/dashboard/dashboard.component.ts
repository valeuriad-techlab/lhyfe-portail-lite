import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GraphicComponent } from './graphic/graphic.component';
import { SelectedSensor } from './models/selected-sensor';
import { Sensor } from './models/sensor';
import { Site } from './models/site';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr' },]
})
export class DashboardComponent implements OnInit {

  //parameters of the Dashboard component
  sites!: Site[];
  selectedSiteFormControl = new FormControl();
  selectedSites: Map<Site, Sensor[]> = new Map();
  displayTemperature!: boolean;
  displayPressure!: boolean;
  rangeObservation = {
    start: new Date(),
    end: new Date()
  }
  
  refreshInterval: any;
  refreshEvent= new EventEmitter();
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getSites().subscribe(sites => {
      this.sites = sites;
      if (this.sites) {
        this.sites.forEach(site => {
          this.dashboardService.getSensorsBySite(site).subscribe(sensors => {
            site.sensors = sensors;
          })
        });
      }
    });

    this.selectedSiteFormControl.valueChanges.subscribe(values => {
      const selectedSensors: SelectedSensor[] = values;
      this.selectedSites = new Map();
      selectedSensors.forEach(selectedSensor => {
        const site = selectedSensor.site;
        const sensor = selectedSensor.sensor;
        if (!this.selectedSites.has(site)) {
          this.selectedSites.set(site, [sensor]);
        } else {
          this.selectedSites.get(site)?.push(sensor);
        }
      });
    })
  }

  updateSensorInFormControl(sensor: Sensor) {
    const selectedSensors: SelectedSensor[] = this.selectedSiteFormControl.value;
    this.selectedSiteFormControl.setValue(selectedSensors.filter(selectedSensor => selectedSensor.sensor !== sensor));
  }

  changeRange(observationRangeSelected: { start: Date, end: Date }) {
    this.rangeObservation.start = observationRangeSelected.start;
    this.rangeObservation.end = observationRangeSelected.end
  }

  changeFilterAxis(filterAxisY: { displayTemperature: boolean, displayPressure: boolean }) {
    this.displayPressure = filterAxisY.displayPressure;
    this.displayTemperature = filterAxisY.displayTemperature;
  }

  setPeriodRefresh(interval: number) {
    clearInterval(this.refreshInterval);
    if (interval) {
      this.refreshInterval = setInterval(() => {
        this.refreshEvent.emit();
      }, interval);
    }
    else {
      this.refreshEvent.emit();
    }
  }
}
