import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
RoomDetailComponent implements OnInit {
  id: number | undefined;
  room: Room | undefined;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
  ) { }

  ngOnInit(): void {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.getRoom();
  }

  handleNewBookingEvent() {
    console.log('handleNewBookingEvent()');

    this.room = undefined;//-> show loading message in room-current-bookings component

    this.getRoom();
  }

  getRoom() {
    if (this.id){
      this.roomService.getRoom(this.id.toString())
        .subscribe(room => {
          this.room = room;
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
