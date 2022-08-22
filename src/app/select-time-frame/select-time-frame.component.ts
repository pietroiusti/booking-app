import { Component, OnInit, Input } from '@angular/core';

// services
import { RoomService } from '../room.service';

// types
import { RoomBookingAssessment } from '../room-booking-assessment';
import { Booking } from '../booking';
import { TimeFrame } from '../time-frame';
import { Room } from '../room';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css']
})
export class SelectTimeFrameComponent implements OnInit {
  @Input() roomId: string | undefined;

  room: Room | undefined;

  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;

  bookingAssessment: RoomBookingAssessment | undefined;
  bookingFinalResult: 'accepted' | 'rejected' | undefined;

  constructor(
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    if (this.roomId) {
      this.roomService.getRoom(this.roomId)
        ?.subscribe(r => this.room = r);
    }
  }

  // Check if booking start time is before end time
  startBeforeEnd (booking: Booking): boolean {
    console.log('startBeforeEnd() checking booking...');

    if ( booking.start < booking.end )
      return true;
    else
     return false;
  }

  // Check whether booking overalaps with another booking
  overlap(roomBookings: Booking[], b: Booking): boolean {
    console.log('overlap() checking booking...');
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

    for (let booking of roomBookings) {
      if (framesOverlap(booking, b)) {
        return true;
      }
    }

    return false;
  }

  handleInput() {
    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';

    let booking = {
      person: 'John',
      start: Date.parse(UnixTimestampStartString),
      end: Date.parse(UnixTimestampEndString),
    };

    if (! this.startBeforeEnd(booking)) {
      this.bookingAssessment = { result: false, msg: "start > end?" };
    } else {

      if (this.room) {
        if (this.overlap(this.room.bookings, booking)) {
          this.bookingAssessment = { result: false, msg: "???" };
        } else { // all okay, we can book
          this.bookingAssessment = { result: true, msg: "Coooool" };


          this.room.bookings.push(booking);


          this.roomService.book(this.room)
            .subscribe( () => {
              console.log('Booked!');
            });
        }
      }
    }
  }

}
