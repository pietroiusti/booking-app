import { Component, OnInit } from '@angular/core';

import { RoomService } from '../room.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomsKeys: number[] = [];

  constructor(
    private roomService: RoomService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getRoomsKeys();
  }

  getRoomsKeys(): void {
    this.roomService.getRoomsIds()
        .subscribe(v => this.roomsKeys = v);
  }

  goBack(): void {
    this.location.back();
  }
}
