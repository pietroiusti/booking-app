import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription, filter, map, tap } from 'rxjs';

import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { RoomService } from '../room.service';

import { Store } from '../store';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCurrentBookingsComponent implements OnInit {

  @Input() roomId!: number;

  rooms!: Room[];
  @Input() rooms$!: Observable<Room[]>;
  roomCurrentBookings!: Booking[];

  constructor(
    private store: Store,
    private roomService: RoomService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.rooms$.subscribe( rooms => {
      let bookings = rooms.find(r => r.id === this.roomId)?.bookings;
      if (bookings)
        this.roomCurrentBookings = bookings;

      this.cd.markForCheck();
    });
  }
}
