import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const rooms = [
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

    return {rooms};
  };

  constructor() { }
}
