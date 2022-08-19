import { Injectable } from '@angular/core';

import { ROOMDATA } from './mock-rooms-data';

import { Booking } from './booking';
import { Room } from './room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsData = ROOMDATA;

  constructor() { }

  getRoomsData(): Room[] {
    return this.roomsData;
  }

  getRoom(id: string | undefined): Room | undefined {
    let room = ROOMDATA.find(obj => obj.id.toString() === id);
    return room;
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