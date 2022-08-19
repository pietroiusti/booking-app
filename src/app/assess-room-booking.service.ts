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

  // Check if booking start time is before end time
  startBeforeEnd (booking: Booking): boolean {
    console.log('startBeforeEnd() checking booking...');

    if ( booking.start < booking.end )
      return true;
    else 
     return false;
  }  

  // Check whether booking overalaps with another booking
  overlap(roomId: string | undefined, b: Booking): boolean {
    console.log('overlap() checking booking...');

    // Takes two time frames.
    // Return true if frames overlap.
    // expects a time frame start to be less than its end.
    // A time frame is a object with a start and and end time in unix timestamp format:
    // {start: TimeFrame, end: TimeFrame}
    function framesOverlap(tf1: TimeFrame, tf2: TimeFrame): boolean {
      // Checking overlap:
      //      |----tf1----|
      // |---------tf2---------|
      if ( (tf2.start <= tf1.start) && (tf2.end >= tf1.end) )
        return true;

      // Checking overlap:
      // |---------tf1---------|
      //      |----tf2----|
      if ( (tf2.start >= tf1.start) && (tf2.start < tf1.end)
                                    &&
           (tf2.end > tf1.start)    && (tf2.end <= tf1.end) )
           return true;

      // Checking overlap:
      //       |----tf1----|
      // |----tf2----|
      if ( (tf2.start <= tf1.start) && (tf2.end > tf1.start) )
        return true;

      // Checking overlap:
      // |----tf1----|
      //       |----tf2----|
      if ( (tf2.start < tf1.end) && (tf2.end >= tf1.end) )
        return true;

      // Time frames do not overlap
      // |----tf1(2)----|     |----tf2(1)----|
      return false;
    }

    let room = this.roomService.getRoom(roomId);

    if (room?.bookings) {
      let roomBookings = room.bookings;
      roomBookings = room.bookings;
      for (let booking of roomBookings) {
        /*
        console.log('');
        console.log('###################')
        console.log('BOOKING COMPARISON:')

        console.log('b.start: ' + b.start + ' (' + new Date(b.start) + ')');
        console.log('booking.start: ' + booking.start + ' (' + new Date(booking.start).toString() + ')');

        console.log('b.end: ' + b.end + ' (' + new Date(b.end) + ')');
        console.log('booking.end: ' + booking.end + ' (' + new Date(booking.end).toString() + ')');
        */
        if (framesOverlap(booking, b)) {
          return true;
        }
      }
    }
    return false;
  }

  assess(roomId: string | undefined, booking: Booking): RoomBookingAssessment {
    console.log('Assessing:')

    if (!this.startBeforeEnd(booking))
      return { result: false, msg: "End time cannot be before or the same as the start time... Are you awake?" };

    if (this.overlap(roomId, booking)) {
      return { result: false, msg: "Your booking overlaps with another one." };
    }

    let result: boolean = true;
    let msg = 'Yay!!!';
    return {result, msg};
  }
}
