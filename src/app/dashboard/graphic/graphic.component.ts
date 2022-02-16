import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { SelectedSensor } from '../models/selected-sensor';
import { Sensor } from '../models/sensor';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.sass']
})
export class GraphicComponent implements OnInit, OnChanges {

  @Input() public selectedSensors!: SelectedSensor[];
  @Input() public displayTemperature!: boolean;
  @Input() public displayPressure!: boolean;
  @Input() public dateStart!: Date;
  @Input() public dateEnd!: Date;
  @Input() public refreshEvent!: EventEmitter<undefined>;

  layout!: object;

  config: object = {
    responsive: true,
    displaylogo: false,
    autosizable: true,
  };

  dataGraphic!: object[];

  private temperaturesShades!: string[];
  private pressuresShades!: string[];

  private temperatureColorIndexSelector = 0;
  private pressureColorIndexSelector = 0;

  private temparatureSensorColorMap: Map<number, string> = new Map();
  private  pressureSensorColorMap: Map<number, string> = new Map();

  constructor(private httpClient: HttpClient, private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.httpClient.get<string[]>("assets/conf/temperaturesShades.json")
      .subscribe(shades => this.temperaturesShades = shades);
    this.httpClient.get<string[]>("assets/conf/pressuresShades.json")
      .subscribe(shades => this.pressuresShades = shades);

    this.refreshEvent.subscribe(() => this.ngOnChanges());
  }

  ngOnChanges(): void {
    if (this.selectedSensors) {
      this.dataGraphic = [];
      this.selectedSensors.map(selectedSensor => selectedSensor.sensor)
        .forEach((sensor) => {
          this.dashboardService.getSensorsValuesBySensor(sensor, this.dateStart, this.dateEnd).subscribe(values => {
            const time: Date[] = [];
            const temperature: number[] = [];
            const pressure: number[] = [];
            values.forEach(value => {
              time.push(new Date(value.timestamp));
              pressure.push(value.pressure);
              temperature.push(value.pressure_sensor_temperature);
            });

            this.temperatureColorIndexSelector = this.defineSensorColor(this.temparatureSensorColorMap, this.temperaturesShades, this.temperatureColorIndexSelector, sensor.id);
            this.pressureColorIndexSelector = this.defineSensorColor(this.pressureSensorColorMap, this.pressuresShades, this.pressureColorIndexSelector, sensor.id);

            console.log(sensor, this.drawTemparatureTrace(time, temperature, sensor));
            console.log(sensor, this.drawPressureTrace(time, pressure, sensor));
            this.dataGraphic.push(this.drawTemparatureTrace(time, temperature, sensor), this.drawPressureTrace(time, pressure, sensor));
          });
        });
    }

    this.layout = this.defineLayout();
  }

  private defineSensorColor(colorMap: Map<number, string>, shades: string[], colorIndex: number, sensorId: number) {
    if (!colorMap.has(sensorId)) {
      colorMap.set(sensorId, shades[colorIndex]);
      colorIndex++;
      if (colorIndex >= shades.length) {
        colorIndex = 0;
      }
    }
    return colorIndex;
  }

  private drawTemparatureTrace(time: Date[], temperature: number[], sensor: Sensor): Object {
    return {
      x: time,
      y: temperature,
      name: '',
      type: 'scatter',
      mode: 'lines',
      yaxis: `y`,
      visible: this.displayTemperature,
      showlegend: this.displayTemperature,
      legendgroup: sensor.id,
      legendgrouptitle: { text: sensor.model },
      hovertemplate: `${sensor.model}<br>` +
        '%{x|%d/%m/%Y %H:%M}<br>' +
        '<b>%{y} °C</b>',
      marker: {
        color: this.temparatureSensorColorMap.get(sensor.id),
        size: 12
      }
    };
  }

  private drawPressureTrace(time: Date[], pressure: number[], sensor: Sensor): Object {
    return {
      x: time,
      y: pressure,
      name: '',
      type: 'scatter',
      mode: 'none',
      fill: 'tozeroy',
      yaxis: `y2`,
      visible: this.displayPressure,
      showlegend: this.displayPressure,
      legendgroup: sensor.id,
      hoverinfo: { text: sensor.model },
      legendgrouptitle: { text: sensor.model },
      hovertemplate: `${sensor.model}<br>` +
        '%{x|%d/%m/%Y %H:%M}<br>' +
        '<b>%{y} bar</b>',
      fillcolor: this.pressureSensorColorMap.get(sensor.id),
    };
  }

  private defineLayout(): Object {
    return {
      xaxis: {
        title: {
          text: $localize`Date and time (UTC)`,
        },
        type: 'date',
        tickformat: '%d/%m/%Y \n %H:%M',
        range: [this.dateStart, this.dateEnd],
        zeroline: true,
        linecolor: 'rgb(0,0,0)',
        linewidth: 3,
      },
      yaxis: {
        title: {
          text: (this.displayTemperature) ? $localize`Temperature in °C` : '',
        },
        showgrid: this.displayTemperature,
        zeroline: this.displayTemperature,
        showline: this.displayTemperature,
        side: 'left',
        showticklabels: true,
        linecolor: 'rgb(255,0,0)',
        linewidth: 3,
      },
      yaxis2: {
        textposition: "top right",
        title: {
          text: (this.displayPressure) ? $localize`Pressure in bar` : '',
          textangle: '0',
        },
        showgrid: this.displayPressure,
        zeroline: this.displayPressure,
        showline: this.displayPressure,
        linecolor: 'rgb(0,0,255)',
        linewidth: 3,
        overlaying: 'y',
        side: 'right',
      },
      showlegend: true,
      autosize: true,
      height: 800,
      legend: {
        yanchor: 'top',
        y: '1.15',
        x: '0.05',
        orientation: 'h',
        title: {
          text: 'legend',
        },
        borderwidth: 1,
        bordercolor: '#8E8E8E',
      }
    }
  }
}
