import { Component, OnInit } from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getRoomsData();
  }

  getRoomsData() {
    this.rooms = this.roomService.getRoomsData();
  }

  goBack(): void {
    this.location.back();
  }
}
