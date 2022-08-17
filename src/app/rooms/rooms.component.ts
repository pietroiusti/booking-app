import { Component, OnInit } from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.getRoomsData();
  }

  getRoomsData() {
  this.rooms = this.roomService.getRoomData();
  }
}
