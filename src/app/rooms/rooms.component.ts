import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';
import { elementAt, Observable, Subscription, map, combineLatest, concat, of, bindCallback, fromEvent, distinctUntilChanged, Subject } from 'rxjs';

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

  //filtering 3 ######
  filteredRooms3: Room[] | null = null;
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

      this.cd.markForCheck();// TODO: detectChanges instead? Investigate differences.
    });


    // filtering 1 stuff
    /*
    this.rooms$.pipe(elementAt(1)).subscribe(v => this.filteredRooms = v);
    */
  }

  // filtering 1 ######
  // receives values emitted by typeahead$
  // change room list displayed in template accordingly
  handleNameFilterEvent(data: string) {
    /* console.log('handleNameFilterEvent()');
    console.log(data);
    // update view showing only filtered rooms
    if (this.rooms) {
      let re = new RegExp(data, 'i');
      //this.rooms = this.rooms.filter( r => re.test(r.name) );
      this.filteredRooms = this.rooms.filter(r => re.test(r.name));
    } */
  }

  // filtering 2 ######
  // Receive typeahead$
  // combine typeahead$ with room$ using combineLastest()
  // display filtered room
  /*
  handleNameFilterEvent2(typeahead$: Observable<string>) {
    console.log('handleNameFilterEvent2()');

    console.log(this.filteredRooms2);

    let combined = combineLatest([this.rooms$, typeahead$]);

    combined.subscribe(val => {
      console.log('combined Observer');

      let rooms = val[0];
      let filterString = val[1];
      console.log(filterString === '');

      let re = new RegExp(filterString, 'i');
      this.filteredRooms2 = rooms.filter(r => re.test(r.name));
      console.log(this.filteredRooms2);

      //this.cd.markForCheck();
      this.cd.detectChanges(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    })
  }
  */

  // filtering 3 ######
  // Receive inputEvent
  // combine typeahead$ with room$ using combineLastest()
  // display filtered room

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
      this.filteredRooms3 = rooms.filter(r => re.test(r.name));

      //this.cd.markForCheck();
      this.cd.detectChanges(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    })
  }

  /* handleNameFilterEvent3a(event: Event) {
    console.log('handleNameFilterEvent3a');
  } */

  /*
  handleNameFilterEvent3(event: Event | "init") {
    if (event === 'init') {
      this.rooms$.pipe(elementAt(1)).subscribe(v => this.filteredRooms3 = v); // copy into filteredRoom3 the first
                                                                              // value emitted by rooms$
    } else {
      console.log('handleNameFilterEvent3()');
      console.log(event);
      console.log(event.target);

      const typeahead$ = fromEvent(event.target as HTMLInputElement, 'input').pipe(
        map(e => ((e as InputEvent).target as HTMLInputElement).value),
        //filter(text => text.length > 2),
        //debounceTime(10),
        distinctUntilChanged()
      );

      //let comb$ = concat(of(''), typeahead$);
      //let combined = combineLatest([this.rooms$, comb$]);
      let combined = combineLatest([this.rooms$, typeahead$]);

      combined.subscribe(val => {
        console.log('Combined Observer');
        console.log(val[0]);
        console.log(val[1]);

        let rooms = val[0];
        let filterString = val[1];
        //console.log(filterString === '');

        let re = new RegExp(filterString, 'i');
        this.filteredRooms3 = rooms.filter(r => re.test(r.name));
        console.log(this.filteredRooms3);

      })
    }
  }
  */

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
