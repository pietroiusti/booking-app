import { Component, OnInit, OnDestroy } from '@angular/core';

import { RoomService } from '../room.service';

import { Location } from '@angular/common';

import { Store } from '../store';
import { Observable, Subscription } from 'rxjs';

import { Room } from '../models/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  roomsKeys: number[] = [];

  // store related
  rooms$!: Observable<Room[]>;
  subscription!: Subscription;

  constructor(
    private roomService: RoomService,
    private location: Location,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.getRoomsKeys();

    // store related
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.subscription = this.roomService.getRooms$.subscribe();//<-- initiate the data flow
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoomsKeys(): void {
    this.roomService.getRoomsIds()
        .subscribe(v => this.roomsKeys = v);
  }

  goBack(): void {
    this.location.back();
  }
}
