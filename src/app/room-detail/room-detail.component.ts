import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';

import { Booking } from '../booking';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  id: number | undefined;
  bookings: Booking[] = [];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    let data = this.roomService.getRoomData();
    let r = data.find(r => r.id === this.id);
    if (r)
      this.bookings = r.bookings;
  }
}
