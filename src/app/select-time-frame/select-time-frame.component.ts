import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

// services
import { RoomService } from '../room.service';

import { Store } from '../store';

// types
import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { filter, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTimeFrameComponent implements OnInit {

  @Input() roomId: string | undefined;

  rooms!: Room[];
  @Input() rooms$!: Observable<Room[]>;

  @Output() newBookingEvent2 = new EventEmitter();

  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;

  constructor(
    private roomService: RoomService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.rooms$.subscribe( rooms => this.rooms = rooms );
  }

  // store related
  handleInput2(event: MouseEvent) {
    //console.log('handleInput2()');
    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';
    let booking: Booking = {
      person: { // <<<<< logged person (TODO)
        name: 'John',
        surname: 'McBar',
        role: 'Software Engineer',
      },
      timeFrame: {
        start: Date.parse(UnixTimestampStartString),
        end: Date.parse(UnixTimestampEndString),
      }
    };

    let filtered = this.rooms.filter(r => r.id === Number(this.roomId));
    let room = filtered[0];
    let roomBookings = room.bookings;

    let assessment = this.roomService.assessBooking(roomBookings, booking);

    if (assessment) {
      console.log('Booking assessment was good. Passing update room object along.');
      room.bookings.push(booking);

      let updatedRooms = this.rooms.map(r => {
        if (r.id === room.id) return room;
        else                  return r;
      });

      this.newBookingEvent2.emit( { updatedRooms } );
    } else {
      console.log("Cannot make booking...");
    }
  }
}
