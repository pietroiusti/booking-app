import { Booking } from "./booking";

export interface Room {
  // tv
  // whiteboard
  // capacity
  // TODO: button => card
  id: number;
  bookings: Booking[];
}