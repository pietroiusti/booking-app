import { Injectable} from '@angular/core';
import { combineLatest, map, Observable, ReplaySubject, Subject, tap } from 'rxjs';

import { Store } from './store';

import { Filter } from './models/filter';
import { Room } from './models/room';

import { RoomService } from './room.service';
import { Booking } from './models/booking';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  filter: Filter | null = null;
  filter$: Observable<Filter> = this.store.select<Filter>('filter');

  // 1st METHOD
  filteredRooms$$ = new ReplaySubject<Room[]>(1);
  filteredRooms$: Observable<Room[]> = this.filteredRooms$$.asObservable();

  constructor(
    private store: Store,
    private roomService: RoomService,
    ) {

      this.filter$.subscribe(filter => {
        this.filter = filter;
      });
      this.rooms$.subscribe(_ => {
        ;
      });

      /*
      let combined$ = combineLatest([this.rooms$, this.filter$]);
      console.log('filter.service subscribing to combined$');
      combined$.subscribe(val => {

        let rooms = val[0];
        console.log(val[0]);

        let filter = val[1];
        console.log(val[1]);

        let filtered = this.filterRooms(rooms, filter);

        //##########################
        // THIS FUNCTION DOES NOTHING BESIDES UPDATING THE VALUE OF filter!
        //##########################

        // 1st METHOD
        this.filteredRooms$$.next(filtered);
      });
      */

    }

    reset() {
      let filter = {
        name: '',
        ac: false,
        wb: false,
        display: false,
        date: '',
        from: '',
        to: '',
      };

      this.store.set('filter', filter);
    }

    filterRooms(rooms: Room[], filter: Filter): Room[] {
      let re = new RegExp(filter.name, 'i');
      let booking: Booking | null = null;
      if (filter.date && filter.from && filter.to) {
        let UnixTimestampStartString = filter.date + 'T' + filter.from + ':00' + '.000+02:00';
        let UnixTimestampStart = Date.parse(UnixTimestampStartString);
        let UnixTimestampEndString = filter.date + 'T' + filter.to + ':00' + '.000+02:00';
        let UnixTimestampEnd = Date.parse(UnixTimestampEndString);
        booking = {
          person: { name: 'foo', surname: 'bar', role: 'baz' }, // the person does not matter
          timeFrame: { start: UnixTimestampStart, end: UnixTimestampEnd },
        }
      }

      return rooms.filter( r => {
        return (re.test(r.name))
                    &&
               (!filter.ac || r.airConditioning === true)
                    &&
               (!filter.wb || r.whiteboard === true)
                    &&
               (!filter.display || r.display === true)
                    &&
               (!booking || this.roomService.assessBooking(r.bookings, booking))
                    &&
               (!filter.capacity || filter.capacity === this.roomCapacityInWords(r.capacity))
      });
    }

    roomCapacityInWords(num: number): string {
      if (num <= 4) {
        return 'small';
      } else if (num > 4 && num < 10) {
        return 'medium';
      } else if (num >= 10) {
        return 'big';
      } else {
        return 'error';
      }
    }

    handleInput(options: {type: string, value: any}) {
      console.log(`FILTER.SERVICE  HANDLEINPUT, ${options.type}, ${options.value}`);

      let filter = Object.assign({}, this.filter); // shallow copy of filter

      filter[options.type] = options.value;

      this.store.set('selected', []);

      this.store.set('filter', filter);
    }

    // 1st METHOD
    /*
    getFilteredRoomsObsv(): Observable<Room[]> {
      return this.filteredRooms$;
    }
    */
    getFilteredRoomsObsv2(): Observable<Room[]> {
      console.log('getFilteredRoomsObsv2()');
      return combineLatest([this.rooms$, this.filter$])
        .pipe(
          tap(v => {console.log('combineLatest tap'); return v}),
          map( ([rooms, filter]) => this.filterRooms(rooms, filter) ) )
    };
}
