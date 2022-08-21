import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ROOMDATA } from './mock-rooms-data';

import { Booking } from './booking';
import { Room } from './room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor() { }

  //version with observable of the above function
  getRoomsData(): Observable<Room[]> {
    const rooms = of(ROOMDATA);
    return rooms;
  }

  getRoom(id: string): Observable<Room> | null {
    let room = ROOMDATA.find(obj => obj.id.toString() === id);

    if (room)
      return of(room);
    else
      return null;
  }

  book(id: string, booking: Booking): boolean {
    let room = ROOMDATA.find(obj => obj.id.toString() === id);
    if (room) {
      room.bookings.push(booking);
      return false;
    } else {
      return false;
    }
  }
}
