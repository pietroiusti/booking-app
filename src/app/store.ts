import { Observable, BehaviorSubject, distinctUntilChanged, map} from 'rxjs';

import { State } from "./models/state";

import { Room } from './models/room';

const state: State = {
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
  selected: [],
};

export class Store {

  private subject = new BehaviorSubject<State>(state);

  // old from Motto: private store = this.subject.asObservable().distinctUntilChanged();
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() { // return type?
    return this.subject.value;
  }

  // ex: store.select<Todo[]>('todos')
  select<T>(name: string): Observable<T> {
    // old from Motto: return this.store.pluck(name);
    return this.store.pipe(map(x => x[name]));
  }

  select_room(id: number): Observable<Room>{
    return this.store.pipe(
      map(x => x.rooms.find(r => r.id === id))
    );
  }

  // ex: store.set('todos', [{...}, {...}])
  set(name: string, state: any): void {
    this.subject.next({
    // notify the behaviour subj that something changed
      ...this.value, [name]: state
    });
  }

}
