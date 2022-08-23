import { Component, OnInit, Input } from '@angular/core';

import { Booking } from '../models/booking';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css']
})
export class RoomCurrentBookingsComponent implements OnInit {

  @Input() roomCurrentBookings: Booking[] = [];

  constructor(

  ) { }

  ngOnInit(): void {
    console.log(this.roomCurrentBookings);
  }

}
