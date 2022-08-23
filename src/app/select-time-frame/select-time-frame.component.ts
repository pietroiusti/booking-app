import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  // ####################################
  @Output() newBookingEvent = new EventEmitter();
  // ####################################

  @Input() roomId: string | undefined;

  @Input() room: Room | undefined;

  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;

  bookingAssessment: RoomBookingAssessment | undefined;
  bookingFinalResult: 'accepted' | 'rejected' | undefined;

  constructor(
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
  }

  // Check if booking start time is before end time
  startBeforeEnd (booking: Booking): boolean {
    if ( booking.timeFrame.start < booking.timeFrame.end ) {
      console.log('startBeforeEnd(): true');
      return true;
    } else {
      console.log('startBeforeEnd(): false');
      return false;
    }
  }

  // Check whether booking overalaps with another booking
  overlap(roomBookings: Booking[], b: Booking): boolean {
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
      if (framesOverlap(booking.timeFrame, b.timeFrame)) {
        return true;
      }
    }

    return false;
  }

  handleInput() {
    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';

    let booking: Booking = {
      person: {
        name: 'John',
        surname: 'McBar',
        role: 'Software Developer',
      },
      timeFrame: {
        start: Date.parse(UnixTimestampStartString),
        end: Date.parse(UnixTimestampEndString),
      }
    };

    if (! this.startBeforeEnd(booking)) {
      this.bookingAssessment = { result: false, msg: "start > end?" };
    } else {
      if (this.room) {
        if (this.overlap(this.room.bookings, booking)) {
          this.bookingAssessment = { result: false, msg: "???" };
        } else { // all okay, we can book
          this.bookingAssessment = { result: true, msg: "Coooool" };

          let thisRoomCopy = structuredClone(this.room);
          thisRoomCopy.bookings.push(booking);

          this.roomService.book(thisRoomCopy)
            .subscribe( () => {
              console.log('Booked!');
              this.newBookingEvent.emit(); // tell parent
            });

          this.roomService.getRoomsData()
            .subscribe(d => console.log(d));
        }
      }
    }
  }

}
