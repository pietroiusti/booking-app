import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

// services
import { RoomService } from '../room.service';

import { Store } from '../store';

// types
import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTimeFrameComponent implements OnInit {

  @Input() roomId: string | undefined;

  room: Room | null = null;
  @Input() room$: Observable<Room> | undefined;

  rooms: Room[] = [];
  @Input() rooms$: Observable<Room[]> | null = null;

  @Output() newBookingEvent2: EventEmitter<any> = new EventEmitter();
  @Output() newBookingEvent3: EventEmitter<any> = new EventEmitter();

  selectedDate: string | null = null;
  selectedTimeStart: string | null = null;
  selectedTimeEnd: string | null = null;

  constructor(
    private roomService: RoomService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    if (this.rooms$) {
      this.rooms$.subscribe( rooms => this.rooms = rooms );
    }

    if (this.room$) {
      this.room$.subscribe(room => {
        this.room = room;
      })
    }
  }

  handleInput3(): void {
    console.log('handleInput3()');

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

    if (this.room) {
      let assessment = this.roomService.assessBooking(this.room.bookings, booking);
      if (assessment) {
        console.log('Booking assessment was good. Passing update room object along.');

        let room = Object.assign({}, this.room); // shallow copy
        room.bookings.push(booking);

        this.newBookingEvent3.emit(room);
      } else {
        console.log("Cannot make booking...");
      }
    }

  }

  handleInput2(event: MouseEvent): void {
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
        else return r;
      });

      this.newBookingEvent2.emit({ updatedRooms }); //<<<<<< why not emitting the single updated room?
    } else {
      console.log("Cannot make booking...");
    }
  }
}
