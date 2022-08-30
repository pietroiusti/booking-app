import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { RoomService } from '../room.service';

import { Location } from '@angular/common';

import { Store } from '../store';
import { Observable, Subscription } from 'rxjs';

import { Room } from '../models/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit, OnDestroy {
  roomsKeys: number[] = [];

  rooms$!: Observable<Room[]>;
  subscription!: Subscription;

  constructor(
    private roomService: RoomService,
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms'); // Alternatively one can remove the async pipe
                                                      // from the template and do:
                                                      // this.store.select<Room[]>('rooms')
                                                      //     .subscribe(rooms => this.rooms$ = rooms);

    this.subscription = this.roomService.getRooms$.subscribe();//<-- initiate the data flow

    this.rooms$.subscribe(rooms => {
      this.roomsKeys = rooms.map(r => r.id);

      this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
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
