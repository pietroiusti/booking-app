import { Component, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';

import { Observable, combineLatest, Subscription } from 'rxjs';

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
export class RoomsComponent implements OnDestroy, AfterViewInit, OnInit {

  // TEST
  // this observable of rooms emits values, even when properties of the store other than rooms are set!
  test$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  //rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  //filter$: Observable<Filter> = this.store.select<Filter>('filter');

  ngOnInit(): void { }

  filteredRooms: Room[] = [];
  filteredRoomsSubscription: Subscription | null = null;

  selected: number[] = [];
  selected$: Observable<number[]> = this.store.select<number[]>('selected');
  selectedSubscription: Subscription | null = null;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
    private filterService: FilterService,
  ) { }

  ngAfterViewInit(): void {
    // THIS HAS A BUG I CANNOT FIND
    // THE ROOM LISTS RENDERS ONLY IF WE ASK FOR localhost:3000/rooms DIRECTLY
    //
    /*
    let obsv = this.filterService.getFilteredRoomsObsv();
    console.log(obsv);

    obsv.subscribe(filtered => {
      console.log('rooms component: got filtered value')
      this.filteredRooms = filtered;
      this.cd.detectChanges();
    });
    */

    console.log('rooms-component subscribing to getFilteredRoomsObsv2$');
    this.filteredRoomsSubscription = this.filterService.getFilteredRoomsObsv2()
      .subscribe(filtered => {
        console.log('rooms-component: GOT FILTERED ROOMS');
        this.filteredRooms = filtered;
        this.cd.detectChanges();
      });

    console.log('rooms-component subscribing to selected$');
    this.selectedSubscription = this.selected$.subscribe(selected => this.selected = selected);

    console.log('rooms-component subscribing to test$');
    this.test$.subscribe(r => {
      console.log('test$');
    });
  }

  ngOnDestroy(): void {
    this.store.set('selected', []);

    if (this.filteredRoomsSubscription)
      this.filteredRoomsSubscription.unsubscribe();
    if (this.selectedSubscription)
      this.selectedSubscription.unsubscribe();
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
      selected = this.selected.map(x => x); // shallow copy

      if (obj.checked === true) {
        if (!selected.includes(roomId)) selected.push(roomId);
      } else if (obj.checked === false) {
        if (selected.includes(roomId)) selected = selected.filter(id => id !== roomId);
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
