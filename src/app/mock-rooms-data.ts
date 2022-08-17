import { Room } from "./room";

export const ROOMDATA: Room[] = [
  {
    id: 1,
    bookings: [
      {
        person: 'Matthew',
        start: new Date(),
        end: new Date(),
      },
    ]
  },
  {
    id: 2,
    bookings: [
      {
        person: 'Matthew',
        start: new Date(),
        end: new Date(),
      },
      {
        person: 'John',
        start: new Date(),
        end: new Date(),
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