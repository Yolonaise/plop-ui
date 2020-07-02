export interface Floor {
  _id?: { $oid: string }
  name: string;
  number: number
  rooms: string[];
}