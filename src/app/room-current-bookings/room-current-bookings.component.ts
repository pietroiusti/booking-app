import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Booking } from '../models/booking';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCurrentBookingsComponent implements OnInit {

  @Input() roomCurrentBookings: Booking[] | 'loading' = 'loading';

  constructor(

  ) { }

  ngOnInit(): void {}

}
