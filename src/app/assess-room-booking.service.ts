import { Injectable } from '@angular/core';

// services
import { RoomService } from './room.service';

// types
import { TimeFrame } from './time-frame';
import { Booking } from './booking';
import { RoomBookingAssessment } from './room-booking-assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessRoomBookingService {

  constructor(
    private roomService: RoomService,
  ) { }

  endBeforeStart (booking: Booking): boolean {
    console.log('startBeforeEnd() checking booking...');
    if ( booking.end <= booking.start )
      return true;
    else 
     return false;
  }  

  // check whether booking overalaps with another booking
  overlap(roomId: string | undefined, b: Booking): boolean {
    console.log('overlap() checking booking...');

    // Takes two time frames.
    // Return true if frames overlap.
    // expects a time frame start to be less than its end.
    // A time frame is a object with a start and and end time in unix timestamp format:
    // {start: TimeFrame, end: TimeFrame}
    function framesOverlap(tf1: TimeFrame, tf2: TimeFrame): boolean {
      if ( (tf2.start <= tf1.start) && (tf2.end >= tf1.end) )
        return true;

      if ( (tf2.start >= tf1.start) && (tf2.start < tf1.end)
                                    &&
           (tf2.end > tf1.start)    && (tf2.end <= tf1.end) )
           return true;

      if ( (tf2.start <= tf1.start) && (tf2.end > tf1.start) )
        return true;

      if ( (tf2.start < tf1.end) && (tf2.end >= tf1.end) )
        return true;

      return false;
    }

    let room = this.roomService.getRoom(roomId);

    if (room?.bookings) {
      let roomBookings = room.bookings;
      roomBookings = room.bookings;
      for (let booking of roomBookings) {
        if (framesOverlap(b, booking))
          return true;
      }
    }
    return false;
  }

  assess(roomId: string | undefined, booking: Booking): RoomBookingAssessment {
    console.log('Assessing:')

    if (this.endBeforeStart(booking))
      return { result: false, msg: "End time cannot be before or the same as the start time... Are you awake?" };

    if (this.overlap(roomId, booking)) {
      return { result: false, msg: "Your booking overlaps with another one." };
    }

    let result: boolean = true;
    let msg = 'Yay!!!';
    return {result, msg};
  }
}
