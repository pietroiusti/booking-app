import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './models/state';
import { StateService3 } from './store3';
import { Filter } from './models/filter';

const initialState: State = {
  rooms: [],
  filter: {
    name: '',
    ac: false,
    wb: false,
    display: false,
    date: '',
    from: '',
    to: '',
    capacity: '',
  },
  selected: [], // holds the ids of the selected rooms
  lastBooking: undefined,
};


@Injectable({
  providedIn: 'root'
})
export class ProtectedTestsService extends StateService3 {

  constructor() { super(initialState) }

  filter3$: Observable<Filter> = this.select<Filter>('filter');

  selected3$: Observable<number[]> = this.select<number[]>('selected');

  changeFilter() {
    this.set('selected', [99, 100]);
  }

  log() {
    console.log(this.state);
  }
}
