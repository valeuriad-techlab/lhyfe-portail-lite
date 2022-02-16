import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Sensor } from '../models/sensor';
import { SensorValue } from '../models/sensor-value';
import { Site } from '../models/site';

enum ApiRoutes {
  sites = "sites",
  sensors = "sensors",
  values = "values",
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${environment.api.url}${ApiRoutes.sites}${!environment.production ? '.json' : ''}`)
      .pipe(catchError(err => {
        console.log(err);
        return of([]);
      }));
  }

  getSensorsBySite(site: Site): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${environment.api.url}${ApiRoutes.sites}/${site.id}/${ApiRoutes.sensors}`)
      .pipe(catchError(err => {
        console.log(err);
        return of([]);
      }));
  }

  getSensorsValuesBySensor(sensor: Sensor, startDate: Date, endDate: Date): Observable<SensorValue[]> {
    let params = new HttpParams();
    const start = this.datePipe.transform(startDate, 'dd/MM/YYYYTHH:mm:ss');
    const end = this.datePipe.transform(endDate, 'dd/MM/YYYYTHH:mm:ss');
    if (start) {
      params = params.set("measure_start_time", start);
    }
    if (end) {
      params = params.set("measure_end_time", end);
    }
    const options = { params: params };
    return this.http.get<SensorValue[]>(`${environment.api.url}${ApiRoutes.sensors}/${sensor.id}/${ApiRoutes.values}`, options)
      .pipe(catchError(err => {
        console.log(err);
        return of([]);
      }));
  }
}
