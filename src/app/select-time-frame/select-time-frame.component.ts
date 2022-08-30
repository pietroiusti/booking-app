import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';

// services
import { RoomService } from '../room.service';

import { Store } from '../store';

// types
import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTimeFrameComponent implements OnInit {

  gpFormControl = new FormControl('');
  selectedDateControl = new FormControl('');
  selectedTimeStartControl = new FormControl('');
  selectedTimeEndControl = new FormControl('');

  room: Room | null = null;
  @Input() room$: Observable<Room> | undefined;

  @Output() newBookingEvent: EventEmitter<any> = new EventEmitter();

  selectedDate: string | null = null;
  selectedTimeStart: string | null = null;
  selectedTimeEnd: string | null = null;

  constructor(
    private roomService: RoomService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    if (this.room$) {
      this.room$.subscribe(room => {
        this.room = room;
      })
    }
  }

  handleInput(): void {
    console.log('handleInput()');

    console.log('this.selectedDateControl.value:');
    console.log(this.selectedDateControl.value);
    console.log('this.selectedTimeStartControl.value:');
    console.log(this.selectedTimeStartControl.value);
    console.log('this.selectedTimeEndControl.value:');
    console.log(this.selectedTimeEndControl.value);

    this.gpFormControl.setValue('hola');

    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampStart = Date.parse(UnixTimestampStartString);
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';
    let UnixTimestampEnd = Date.parse(UnixTimestampEndString);

    let booking = this.roomService.createBooking(UnixTimestampStart, UnixTimestampEnd);

    if (this.room) {
      let assessment = this.roomService.assessBooking(this.room.bookings, booking);
      if (assessment) {
        console.log('Booking assessment was good. Passing update room object along.');

        let room = Object.assign({}, this.room); // shallow copy
        room.bookings.push(booking);

        this.newBookingEvent.emit(room);
      } else {
        console.log("Cannot make booking...");
      }
    }
  }
}
