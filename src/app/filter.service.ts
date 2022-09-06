import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from './store';

import { Filter } from './models/filter';
import { Room } from './models/room';

import { RoomService } from './room.service';
import { Booking } from './models/booking';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter: Filter | null = null;
  filter$: Observable<Filter> | null = null;

  constructor(
    private store: Store,
    private roomService: RoomService,
    ) {
      console.log('filterService constructor()');

      this.filter$ = this.store.select<Filter>('filter');
      this.filter$.subscribe(filter => {
        console.log('filterService: ');
        this.filter = filter;
        console.log(this.filter);
      });

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
               (!booking || this.roomService.assessBooking(r.bookings, booking));
      });
    }

    handleInput(options: {type: string, value: any}) {
      console.log('filter.service: ');
      console.log(options);

      let filter = Object.assign({}, this.filter); // shallow copy of filter

      switch (options.type) {
        case 'name':
          console.log('filter service: trying to update name in store with value ' + options.value);
          filter.name = options.value;
          this.store.set('filter', filter);
          break;
        case 'ac':
          console.log('filter service: trying to update ac in store with value ' + options.value);
          filter.ac = options.value;
          this.store.set('filter', filter);
          break;
        case 'wb':
          console.log('filter service: trying to update wb in store with value ' + options.value);
          filter.wb = options.value;
          this.store.set('filter', filter);
          break;
        case 'display':
          console.log('filter service: trying to update display in store with value ' + options.value);
          filter.display = options.value;
          this.store.set('filter', filter);
          break;
        case 'date':
          console.log('filter service: trying to update date in store with value ' + options.value);
          filter.date = options.value;
          this.store.set('filter', filter);
          break;
        case 'from':
          console.log('filter service: trying to update from in store with value ' + options.value);
          filter.from = options.value;
          this.store.set('filter', filter);
          break;
        case 'to':
          console.log('filter service: trying to update to in store with value ' + options.value);
          filter.to = options.value;
          this.store.set('filter', filter);
          break;
        default:
          console.log('Error: incorrect options');
      }

    }

}
