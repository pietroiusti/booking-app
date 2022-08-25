import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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

  @Input() roomCurrentBookings: Booking[] | 'loading' = 'loading';

  // store related
  @Input() rooms$!: Observable<Room[]>

  constructor(

  ) { }

  ngOnInit(): void {}

}
