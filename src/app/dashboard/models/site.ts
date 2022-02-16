import { Sensor } from "./sensor";

export interface Site {
    id: number;
    company_id: number;
    name: string;
    latitude: number;
    longitude: number;
    contact: string;
    type: string;
    sensors?: Sensor[];
}
