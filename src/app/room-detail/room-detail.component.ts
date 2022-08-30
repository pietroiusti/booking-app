import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';

import { Store } from '../store';
import { filter, map, tap, Observable, Subscription, scan } from 'rxjs';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
  RoomDetailComponent implements OnInit, OnDestroy {
  id!: number;

  //room: Room | null = null;
  room$: Observable<Room> | undefined;

  rooms$: Observable<Room[]> | null = null;
  subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.rooms$ = this.store.select<Room[]>('rooms');
    this.subscription = this.roomService.getRooms$.subscribe();

    this.room$ = this.store.select_room(this.id);
    //this.room$.subscribe(r => this.room = r);
  }

  ngOnDestroy(): void {
    //unsubscribe?
  }

  handleNewBookingEvent2(obj: any) {
    //console.log(this.room);

    let updatedRooms = obj.updatedRooms;
    let updatedRoom = updatedRooms.find((r: Room) => r.id === this.id);
    this.roomService.updateRooms(updatedRoom);
  }

  goBack(): void {
    this.location.back();
  }
}
