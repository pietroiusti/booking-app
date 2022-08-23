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
            person: {
              name: 'Matthew',
              surname: 'Tonelli',
              role: 'Designer'
            },
            timeFrame: {
              start: 1661331600000,
              end: 1661337000000,
            }
          },
        ]
      },
      {
        id: 2,
        bookings: [
          {
            person: {
              name: 'Betty',
              surname: 'Bassetti',
              role: 'Product manager',
            },
            timeFrame: {
              start: 1661175000000,
              end: 1661178600000,
            }
          },
          {
            person: {
              name: 'John',
              surname: 'Stane',
              role: 'Backend Software engineer',
            },
            timeFrame: {
              start: 1661183100000,
              end: 1661187600000,
            }
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
