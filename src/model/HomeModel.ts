export interface Home {
  _id?: { $oid: string }
  name: string;
  floors: number;
  rooms: string[];
}