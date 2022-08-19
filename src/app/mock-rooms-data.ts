import { Room } from "./room";

export const ROOMDATA: Room[] = [
  {
    id: 1,
    bookings: [
      {
        person: 'Matthew',
        start: 1661331600000,
        end: 1661337000000,
      },
    ]
  },
  {
    id: 2,
    bookings: [
      {
        person: 'Matthew',
        start: 1661175000000,
        end: 1661178600000,
      },
      {
        person: 'John',
        start: 1661183100000,
        end: 1661187600000,
      },
    ]
  },
  {
    id: 3,
    bookings: [],
  },
  {
    id: 4,
    bookings: [],
  },
]
