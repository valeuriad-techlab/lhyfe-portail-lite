import { SensorValue } from "./sensor-value";

export interface Sensor {
    id: number;
    site_id: number;
    model: string;
    supplier: string;
    Acquisition_date: Date;
    values?: SensorValue[];
}
