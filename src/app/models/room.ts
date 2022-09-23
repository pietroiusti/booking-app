import { Booking } from "./booking";

export interface Room {
  readonly id: number;
  readonly name: string,
  readonly display: boolean,
  readonly whiteboard: boolean,
  readonly airConditioning: boolean,
  readonly capacity: number,
  readonly bookings: Booking[];
}
