import { Injectable } from '@angular/core';

import { RoomService } from './room.service';
import { AssessRoomBookingService } from './assess-room-booking.service';

@Injectable({
  providedIn: 'root'
})
export class BookRoomService {

  constructor(
    private roomService: RoomService,
    private assessRoomBookingService: AssessRoomBookingService,
  ) { }

  book() {

    // TODO:
    // - use AssessRoomBookingService to check if it's okay
    //
    // - if booking it's okay g

    console.log('assessing...');
    console.log('booking?...');

    // if (somethingWring with booking)
    //   return false
    // else
    return true;
  }
}
