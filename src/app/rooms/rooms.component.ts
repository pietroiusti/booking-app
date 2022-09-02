import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';
import { Observable, Subscription, combineLatest } from 'rxjs';

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

  // Filtering  
  filteredRooms: Room[] | null = null;
  obsv$: Observable<string> | null = null;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.rooms$.subscribe(rooms => {
      this.rooms = rooms;

      // this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
      this.cd.detectChanges()
    });    
  }

  handleNameFilterEvent3b(obsv$: Observable<string>) {
    console.log('handleNameFilterEvent3b()');

    this.obsv$ = obsv$;
    /* this.sub.subscribe(userInput => {
      console.log(userInput);
    }); */
    this.obsv$.subscribe(v => {
      console.log(v);
    })

    let combined = combineLatest([this.rooms$, this.obsv$]);

    combined.subscribe(val => {
      console.log('combined Observer');

      let rooms = val[0];
      let filterString = val[1];

      let re = new RegExp(filterString, 'i');
      this.filteredRooms = rooms.filter(r => re.test(r.name));

      //this.cd.markForCheck();
      this.cd.detectChanges(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    })
  }

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
