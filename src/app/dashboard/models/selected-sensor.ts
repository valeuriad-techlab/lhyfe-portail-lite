import { Sensor } from "./sensor";
import { Site } from "./site";

export interface SelectedSensor {
    site: Site;
    sensor: Sensor;
}
