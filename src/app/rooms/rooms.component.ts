import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
export class RoomsComponent implements OnInit, OnDestroy {
  rooms$!: Observable<Room[]>;

  filter$: Observable<Filter> | null = null;//<<<<<==== this.store.select<Filter>('filter');

  filteredRooms: Room[] | null = null;

  selected: number[] | null = null;
  selected$: Observable<number[]> | null = null;

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

    this.selected$ = this.store.select<number[]>('selected');
    this.selected$.subscribe(selected => this.selected = selected);
  }

  ngOnDestroy(): void {
    this.store.set('selected', []);
  }

  handleCreateRoomClick() {
    // TODO
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

  handleCheckBoxChange(obj: MatCheckboxChange, roomId: number) {
    if (this.selected) {

      let selected;
      selected = this.selected.map(x=>x); // shallow copy

      if (obj.checked === true) {
        if (! selected.includes(roomId)) selected.push(roomId);
      } else if (obj.checked === false) {
        if (selected.includes(roomId)) selected = selected.filter(id=>id!==roomId);
      }
      this.store.set('selected', selected);

    } else {
      console.log('???');
    }
  }

  modifyRoom(event: Event, roomId: number) {
    event.stopPropagation();
    console.log(roomId);
  }

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
