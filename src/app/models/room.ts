import { Booking } from "./booking";

export interface Room {
  id: number;
  bookings: Booking[];
}