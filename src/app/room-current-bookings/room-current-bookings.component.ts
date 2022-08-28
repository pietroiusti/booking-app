import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { RoomService } from '../room.service';

import { Store } from '../store';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css'],

  //changeDetection: ChangeDetectionStrategy.OnPush, // <==================================

})
export class RoomCurrentBookingsComponent implements OnInit, OnDestroy {

  @Input() roomId!: number;

  // store related #######################
  rooms!: Room[];

  roomCurrentBookings!: Booking[];
  subscription!: Subscription;

  rooms$!: Observable<Room[]>;
  //               #######################

  constructor(
    private store: Store,
    private roomService: RoomService,
  ) {}

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.subscription = this.roomService.getRooms$.subscribe();

    this.rooms$.subscribe( rooms => {
      let bookings = rooms.find(r => r.id === this.roomId)?.bookings;
      if (bookings)
        this.roomCurrentBookings = bookings;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
