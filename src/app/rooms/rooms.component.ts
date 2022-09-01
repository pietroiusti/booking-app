import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';
import { elementAt, Observable, Subscription, map, combineLatest } from 'rxjs';

import { Room } from '../models/room';

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

  //filtering 1 ######
  filteredRooms: Room[] | null = null;


  //filtering 2 ######
  filteredRooms2: Room[] | null = null;


  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.rooms$.subscribe(rooms => {
      this.rooms = rooms;

      //if (! this.filteredRooms2) {
      //  console.log(' !this.filteredRooms2');
      //  this.filteredRooms2 = rooms;
      //  console.log(rooms);
      //}

      this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
    });

    // filtering 1
    this.rooms$.pipe(elementAt(1)).subscribe(v => this.filteredRooms = v);
  }

  // filtering 1 ######
  // receives values emitted by typeahead$
  // change room list displayed in template accordingly
  handleNameFilterEvent(data: string) {
    console.log('handleNameFilterEvent()');
    console.log(data);
    // update view showing only filtered rooms
    if (this.rooms) {
      let re = new RegExp(data, 'i');
      //this.rooms = this.rooms.filter( r => re.test(r.name) );
      this.filteredRooms = this.rooms.filter( r => re.test(r.name) );
    }
  }

  // filtering 2 ######
  // Receive typeahead$
  // combine typeahead$ with room$ using combineLastest()
  // display filtered room
  handleNameFilterEvent2(typeahead$: Observable<string>) {
    console.log('handleNameFilterEvent2()');

    console.log(this.filteredRooms2);

    let combined = combineLatest([this.rooms$, typeahead$]);

    combined.subscribe(val => {
      let rooms = val[0];
      let filterString = val[1];

      let re = new RegExp(filterString, 'i');
      this.filteredRooms2 = rooms.filter( r => re.test(r.name) );
    })
  }

  // filtering 3 ######
  // Receive inputEvent
  // combine typeahead$ with room$ using combineLastest()
  // display filtered room
  handleNameFilterEvent3() {
    console.log('handleNameFilterEvent3()');
  }



  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
