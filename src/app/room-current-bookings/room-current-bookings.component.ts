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

  @Input() id!: number;

  // store related
  rooms!: Room[];
  roomCurrentBookings2!: Booking[];
  subscription!: Subscription;

  constructor(
    private store: Store,
    private roomService: RoomService,
  ) {}

  ngOnInit(): void {
    this.store.select<Room[]>('rooms')
      .subscribe(rooms => {
          this.rooms = rooms;

          let filtered = rooms.filter(r => r.id === this.id);

          if (filtered.length) // <-- TODO why is sometimes empty? fix?
            this.roomCurrentBookings2 = filtered[0].bookings;
      });
    this.subscription = this.roomService.getRooms$.subscribe(); //<-- unnecessary?

    console.log('id: '+ this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
