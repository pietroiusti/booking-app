import { Person } from "./person";
import { TimeFrame } from "./time-frame";

export interface Booking {
  person: Person,
  timeFrame: TimeFrame,
}