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
    // store related
    this.rooms$ = this.store.select<Room[]>('rooms'); // Alternatively one can remove the async pipe
                                                      // from the template and do:
                                                      // this.store.select<Room[]>('rooms')
                                                      //     .subscribe(rooms => this.rooms$ = rooms);

    this.subscription = this.roomService.getRooms$.subscribe();//<-- initiate the data flow

    this.rooms$.subscribe(rooms => {
      this.roomsKeys = rooms.map(r => r.id);
    });
  }

  logStore() {
    console.log(this.store);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
