import { Component, OnInit, Input } from '@angular/core';

// services
import { AssessRoomBookingService } from '../assess-room-booking.service';
import { RoomService } from '../room.service';

// types
import { RoomBookingAssessment } from '../room-booking-assessment';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css']
})
export class SelectTimeFrameComponent implements OnInit {
  @Input() roomId: string | null = null;

  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;
  bookingAssessment: RoomBookingAssessment | undefined;
  bookingFinalResult: 'accepted' | 'rejected' | undefined;

  constructor(
    private assessRoomBookingService: AssessRoomBookingService,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
  }

  handleInput() {
    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';
    let booking = {
      person: 'John',
      start: Date.parse(UnixTimestampStartString),
      end: Date.parse(UnixTimestampEndString),
    };

    if (this.roomId) {
      let assessment = this.assessRoomBookingService.assess(this.roomId, booking);
      this.bookingAssessment = assessment;

      if (this.bookingAssessment.result === true) {
        let result = this.roomService.book(this.roomId, booking);

        if (result)
          this.bookingFinalResult = 'accepted';
      }
    }

  }
}