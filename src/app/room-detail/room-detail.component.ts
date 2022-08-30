import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';

import { Store } from '../store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
  RoomDetailComponent implements OnInit, OnDestroy {
  id!: number;

  room$: Observable<Room> | undefined;

  subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.subscription = this.roomService.getRooms$.subscribe(); // TODO: avoid duplication!

    this.room$ = this.store.select_room(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleNewBookingEvent(updatedRoom: Room) {
    console.log(updatedRoom);
    this.roomService.updateRooms(updatedRoom); // why not in select time frame comp?
  }

  goBack(): void {
    this.location.back();
  }
}
