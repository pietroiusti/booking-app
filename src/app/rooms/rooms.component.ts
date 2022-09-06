import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';

import { Observable, Subscription, combineLatest } from 'rxjs';

import { Room } from '../models/room';

import { FilterService } from '../filter.service';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit {
  rooms: Room[] | null = null;
  rooms$!: Observable<Room[]>;
  subscription!: Subscription;

  filter: Filter | null = null;
  filter$: Observable<Filter> | null = null;

  // Filtering  
  filteredRooms: Room[] | null = null;
  obsv$: Observable<string> | null = null;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.rooms$.subscribe(rooms => {
      this.rooms = rooms;
      // this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
      this.cd.detectChanges()
    });

    this.filter$ = this.store.select<Filter>('filter');
    this.filter$.subscribe(filter => {
      console.log('rooms.component: ');
      console.log(filter);
    });

    let combined = combineLatest([this.rooms$, this.filter$]);
    combined.subscribe(val => {
      let rooms = val[0];
      let filter = val[1];

      let filtered = this.filterService.filterRooms(rooms, filter);
      this.filteredRooms = filtered;

      this.cd.detectChanges();
    });
  }

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
