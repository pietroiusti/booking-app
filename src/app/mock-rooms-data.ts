import { Room } from "./room";

export const ROOMDATA: Room[] = [
  {
    id: 1,
    bookings: [
      {
        person: 'Matthew',
        start: new Date(new Date('August 20, 2022 12:30:00')),
        end: new Date(new Date('August 20, 2022 13:30:00')),
      },
    ]
  },
  {
    id: 2,
    bookings: [
      {
        person: 'Matthew',
        start: new Date(new Date('September 1, 2022 10:30:00')),
        end: new Date(new Date('September 1, 2022 11:30:00')),
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