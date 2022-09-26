import { Injectable} from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { Store } from './store';

import { Filter } from './models/filter';
import { Room } from './models/room';

import { RoomService } from './room.service';
import { Booking } from './models/booking';
import produce from 'immer';

import { ActionHandlerService } from './action-handler.service';
import { StateService4Service } from './state-service4.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  //rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');
  rooms$: Observable<Room[]> = this.stateService4Service.rooms$;

  filter: Filter | null = null;
  //filter$: Observable<Filter> = this.store.select<Filter>('filter');
  filter$: Observable<Filter> = this.stateService4Service.filter$;

  constructor(
    private store: Store,
    private roomService: RoomService,
    private actionHandler: ActionHandlerService,
    private stateService4Service: StateService4Service,
    ) {

      this.filter$.subscribe(filter => {
        this.filter = filter;
      });

    }

    reset() {
      let filter: Filter = {
        name: '',
        ac: false,
        wb: false,
        display: false,
        capacity: '',
        date: '',
        from: '',
        to: '',
      };

      //this.actionHandler.updateFilter(filter);
      this.stateService4Service.updateFilter(filter);
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
      return num<=4?'small':num>4&&num<10?'medium':num>=10?'big':'error';
    }

    handleInput(options: {type: string, value: any}) {
      console.log(`FILTER.SERVICE  HANDLEINPUT, ${options.type}, ${options.value}`);

      if (!this.filter)
        return;

      const updatedFilter = produce(this.filter, draft => {
          draft[options.type] = options.value;
      });

      //this.actionHandler.resetSelected();
      this.stateService4Service.resetSelected();

      //this.actionHandler.updateFilter(updatedFilter);
      this.stateService4Service.updateFilter(updatedFilter);
    }

    getFilteredRoomsObsv2(): Observable<Room[]> {
      console.log('getFilteredRoomsObsv2()');
      return combineLatest([this.rooms$, this.filter$])
        .pipe(
          tap(v => {console.log('combineLatest tap', v); return v}),
          map( ([rooms, filter]) => this.filterRooms(rooms, filter) ) )
    };
}
