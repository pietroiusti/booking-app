import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';

import { Store } from '../store';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
RoomDetailComponent implements OnInit, OnDestroy {
  id!: number;
  room: Room | undefined;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private store: Store,
  ) { }

  ngOnInit(): void {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  ngOnDestroy(): void {}

  // store related
  handleNewBookingEvent2(obj: any) {

    console.log('handleNewBookingEvent2()');
    console.log('obj');
    console.log(obj);

    // todo: update store, that is, say something to the service
    let updatedRooms = obj.updatedRooms;

    updatedRooms = structuredClone(updatedRooms); //<========================

    let updatedRoom = updatedRooms.find((r: Room) => r.id === this.id);

    console.log('Trying to update store through room service');
    this.roomService.updateRooms(updatedRoom);
  }

  goBack(): void {
    this.location.back();
  }
}
