import { Component, OnInit } from '@angular/core';

import { AssessRoomBookingService } from '../assess-room-booking.service';

import { RoomBookingAssessment } from '../room-booking-assessment';
import { BookRoomService } from '../book-room.service';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css']
})
export class SelectTimeFrameComponent implements OnInit {
  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;
  bookingAssessment: RoomBookingAssessment | undefined;

  constructor(
    private assessRoomBookingService: AssessRoomBookingService,
    private bookRooomService: BookRoomService,
  ) { }

  ngOnInit(): void {
  }

  handleInput() {
    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';
    let booking = {
      person: 'Johnny',
      start: Date.parse(UnixTimestampStartString),
      end: Date.parse(UnixTimestampEndString),
    };

    let assessment = this.assessRoomBookingService.assess(booking);
    this.bookingAssessment = assessment;

    if (this.bookingAssessment.result === 'accepted') {
      this.bookRooomService.book(); // TODO: actually add booking stored data
    }
  }
}
