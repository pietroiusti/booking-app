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
      this.filter$ = this.store.select<Filter>('filter');
      this.filter$.subscribe(filter => {
        this.filter = filter;
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
      console.log('filter.service: ');

      let filter = Object.assign({}, this.filter); // shallow copy of filter

      filter[options.type] = options.value;

      this.store.set('selected', []);

      this.store.set('filter', filter);
    }

}
