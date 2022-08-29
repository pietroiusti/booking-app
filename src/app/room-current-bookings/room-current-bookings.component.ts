import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Booking } from '../models/booking';
import { Room } from '../models/room';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCurrentBookingsComponent implements OnInit {

  @Input() roomId: number | undefined;

  rooms: Room[] = [];
  @Input() rooms$: Observable<Room[]> | null = null;
  roomCurrentBookings: Booking[] = [];

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.rooms$) {
      this.rooms$.subscribe(rooms => {
        if (this.roomId !== undefined) {
          let bookings = rooms.find(r => r.id === this.roomId)?.bookings;
          if (bookings)
            this.roomCurrentBookings = bookings;

          this.cd.markForCheck();
        }
      });
    }
  }
}
