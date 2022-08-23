import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

// services
import { RoomService } from '../room.service';

// types
import { RoomBookingAssessment } from '../models/room-booking-assessment';
import { Booking } from '../models/booking';
import { Room } from '../models/room';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTimeFrameComponent implements OnInit {

  @Output() newBookingEvent = new EventEmitter();

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

    if (this.room) {
      let assessment = this.roomService.assessBooking(this.room.bookings, booking);
      if (assessment) {
        this.bookingAssessment = { result: true, msg: "Coooool" };
        let thisRoomCopy = structuredClone(this.room);
          thisRoomCopy.bookings.push(booking);
          this.roomService.book(thisRoomCopy)
            .subscribe( () => {
              console.log('Booked!');
              this.newBookingEvent.emit(); // tell parent
            });
      } else {
        this.bookingAssessment = { result: false, msg: "???" }; // todo: pass a string with a hint about what's wrong
      }
    }
  }
}
