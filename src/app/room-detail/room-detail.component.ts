import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';
import { Observable, Subscription, map, tap, reduce, filter } from 'rxjs';

import { Store } from '../store';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
RoomDetailComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleNewBookingEvent() {
    console.log('handleNewBookingEvent()');

    this.room = undefined;//-> show loading message in room-current-bookings component

    this.getRoom();
  }

  // store related
  handleNewBookingEvent2(event: any) {
    console.log('handleNewBookingEvent2()');
    console.log('event.foo:');
    console.log(event.foo);

    // todo: update store, that is, say something to the service

    console.log('Trying to update store through room service');
    this.roomService.updateRooms(event);
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
