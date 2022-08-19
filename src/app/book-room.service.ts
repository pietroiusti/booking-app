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
    // TODO
    console.log('booking... (TODO)');
    return true;
  }
}
