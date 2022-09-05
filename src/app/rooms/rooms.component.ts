import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';
import { Observable, Subscription, combineLatest, from } from 'rxjs';

import { Room } from '../models/room';
import { ObservableFilter } from '../models/observable-filter';
import { Booking } from '../models/booking';

import { RoomService } from '../room.service';

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

  // #
  filter: Object | null = null;
  filter$: Observable<any> | null = null;
  // #

  // Filtering  
  filteredRooms: Room[] | null = null;
  obsv$: Observable<string> | null = null;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.rooms$ = this.store.select<Room[]>('rooms');
    this.rooms$.subscribe(rooms => {
      this.rooms = rooms;

      // this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
      this.cd.detectChanges()
    });

    // #
    this.filter$ = this.store.select<any>('filter');
    this.filter$.subscribe(filter => {
      console.log('rooms.component: ');
      console.log(filter);
    });
    // #
  }

  handleFilterInit(observablesObj: ObservableFilter) {
    console.log('handleNameFilterInit()');

    let combined = combineLatest(
                                  [
                                    this.rooms$, observablesObj.name$,
                                    observablesObj.ac$,
                                    observablesObj.wb$,
                                    observablesObj.display$,
                                    observablesObj.date$,
                                    observablesObj.from$,
                                    observablesObj.to$,
                                  ]
                                );

    combined.subscribe(val => {
      console.log('combined Observer');

      let rooms = val[0];
      console.log(rooms);
      let filterString = val[1];
      let acBoolean = val[2];
      let wcBoolean = val[3];
      let displayBoolean = val[4];


      let dateString = val[5];
      let fromString = val[6];
      let toString = val[7];
      let booking: Booking | null = null;

      if (dateString && fromString && toString) {
        //TODO: these computations should be somewhere else. Cf. room-detail component
        let UnixTimestampStartString = dateString + 'T' + fromString + ':00' + '.000+02:00';
        let UnixTimestampStart = Date.parse(UnixTimestampStartString);
        let UnixTimestampEndString = dateString + 'T' + toString + ':00' + '.000+02:00';
        let UnixTimestampEnd = Date.parse(UnixTimestampEndString);
        booking = {
          person: { name: 'foo', surname: 'bar', role: 'baz' },// the person does not matter
          timeFrame: { start: UnixTimestampStart, end: UnixTimestampEnd },
        };
        console.log(booking);
      }

      let re = new RegExp(filterString, 'i');
      this.filteredRooms = rooms.filter( (r) => {
        return (re.test(r.name))
                      &&
               (!acBoolean || r.airConditioning === true)
                      &&
               (!wcBoolean || r.whiteboard === true)
                      &&
               (!displayBoolean || r.display === true)
                      &&
               (!booking || this.roomService.assessBooking(r.bookings, booking));
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
