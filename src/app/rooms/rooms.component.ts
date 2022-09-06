import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';

import { Observable, combineLatest } from 'rxjs';

import { Room } from '../models/room';

import { FilterService } from '../filter.service';
import { Filter } from '../models/filter';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit {
  rooms$!: Observable<Room[]>;

  filter$: Observable<Filter> | null = null;

  filteredRooms: Room[] | null = null;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');

    this.filter$ = this.store.select<Filter>('filter');

    let combined = combineLatest([this.rooms$, this.filter$]);
    combined.subscribe(val => {
      let rooms = val[0];
      let filter = val[1];

      let filtered = this.filterService.filterRooms(rooms, filter);
      this.filteredRooms = filtered;

      this.cd.detectChanges();
    });
  }

  handleCreateRoomClick() {
    // TODO
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

  handleCheckBoxChange(obj: MatCheckboxChange) {
    console.log(obj);
    this.store.set
  }

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
