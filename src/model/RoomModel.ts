import { Device } from "./DeviceModel";

export interface Room {
  _id?: { $oid: string }
  name: string;
  size: number;
  floor: number;
  devices: Device[];
}