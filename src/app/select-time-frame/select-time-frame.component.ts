import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

// services
import { RoomService } from '../room.service';

import { Store } from '../store';

// types
import { RoomBookingAssessment } from '../models/room-booking-assessment';
import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTimeFrameComponent implements OnInit, OnDestroy {

  @Output() newBookingEvent = new EventEmitter();

  @Input() roomId: string | undefined;
  @Input() room: Room | undefined;



  // store related #####################################################
  @Output() newBookingEvent2 = new EventEmitter();

  rooms!: Room[]; // <-- value from Observable input
  @Input() rooms$!: Observable<Room[]>;

  rooms2!: Room[];// <-- from the store directly; no input from parent.
                   // I'll deal with implementing input/output, parent/children,
                   // relationships later on.
  subscription!: Subscription;

  //@Input() room$!: Observable<Room>; // the room we are dealing with
  @Input() room$!: Observable<Room>; // temporary
  //               #####################################################



  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;

  bookingAssessment: RoomBookingAssessment | undefined;
  bookingFinalResult: 'accepted' | 'rejected' | undefined;

  constructor(
    private roomService: RoomService,
    private store: Store,
  ) { }

  ngOnInit(): void {

    this.store.select<Room[]>('rooms')
      .subscribe(rooms => this.rooms2 = rooms)
    this.subscription = this.roomService.getRooms$.subscribe();//<-- initiate the data flow

    this.rooms$.subscribe(
      rooms => this.rooms = rooms
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleInput2(event: MouseEvent) {
    console.log('hello world');
    console.log(event);

    console.log('this room:');
    console.log(this.room$);

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

    // I have got the data about the rooms from as an input from the parent (from subscribing to the Observable input)
    // (in `this.rooms`); the logic about the acceptability of a booking proposal can then be based on that data.
    let room = this.rooms.filter(r => r.id === Number(this.roomId))[0];
    let roomBookings = room.bookings;

    let assessment = this.roomService.assessBooking(roomBookings, booking);

    if (assessment) {
      console.log('Booking assessment was good. Passing update room object along.');
      room.bookings.push(booking);

      let updatedRooms = this.rooms.map(r => {
        if (r.id === room.id) return room;
        else                  return r;
      });

      console.log('UPDATED ROOMS:');
      console.log(updatedRooms);

      this.newBookingEvent2.emit(updatedRooms);
    } else {

    }

    let logic = true;
    // logic:
    // check internal consistency of booking
    if (logic) {
      this.newBookingEvent2.emit({id: this.roomId, booking: booking});
      // TODO: pass a relevant value. a value that can be use to update the store.
      // I guess the right thing to to is making a copy of the actual state,
      // update it, and pass it along.
    }

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
