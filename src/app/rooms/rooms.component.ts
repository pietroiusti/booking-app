import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { Room } from '../models/room';
import { ObservableFilter } from '../models/observable-filter';

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

  handleFilterInit(observablesObj: ObservableFilter) {
    console.log('handleNameFilterInit()');

    let combined = combineLatest( [
                                    this.rooms$, observablesObj.name$,
                                    observablesObj.ac$,
                                    observablesObj.wb$,
                                  ] );

    combined.subscribe(val => {
      console.log('combined Observer');

      let rooms = val[0];
      let filterString = val[1];
      let acBoolean = val[2];
      let wcBoolean = val[3];

      let re = new RegExp(filterString, 'i');
      this.filteredRooms = rooms.filter( (r) => {
        return (re.test(r.name))
                      &&
               (!acBoolean || r.airConditioning === true)
                      &&
               (!wcBoolean || r.whiteboard === true)
               ;
      });

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
