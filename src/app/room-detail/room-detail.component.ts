import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';
import { Observable, Subscription } from 'rxjs';

import { Store } from '../store';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
RoomDetailComponent implements OnInit {
  id: number | undefined;
  room: Room | undefined;

  // store related
  rooms$!: Observable<Room[]>;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private store: Store,
  ) { }

  ngOnInit(): void {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.getRoom();

      // store related
      this.rooms$ = this.store.select<Room[]>('rooms');
      this.subscription = this.roomService.getRooms$.subscribe();
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
