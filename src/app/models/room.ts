import { Booking } from "./booking";

export interface Room {
  id: number;
  name: string,
  display: boolean,
  whiteboard: boolean,
  airConditioning: boolean,
  capacity: number,
  bookings: Booking[];
}