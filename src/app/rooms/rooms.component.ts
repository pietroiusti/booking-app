import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
export class RoomsComponent implements OnInit {
  roomsKeys: number[] = [];

  rooms$!: Observable<Room[]>;
  subscription!: Subscription;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.rooms$.subscribe(rooms => {
      this.roomsKeys = rooms.map(r => r.id);

      this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
    });
  }

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
