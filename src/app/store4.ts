import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { State } from "./models/state";

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

export class Store4 {
  private state$: BehaviorSubject<any>;

  constructor() {
    this.state$ = new BehaviorSubject(initialState);
  }

  protected get value() {
    return this.state$.getValue();
  }

  protected get observable() {
    return this.state$.asObservable();
  }

  protected select<T>(name: string): Observable<T> {
    return this.state$.asObservable().pipe(
      map(state => state[name]),
      distinctUntilChanged()
    );
  }

  protected set(name: string, state: any): void {
    this.state$.next({ ...this.value, [name]: state });
  }
}
