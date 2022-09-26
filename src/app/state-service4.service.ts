import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Filter } from './models/filter';
import { Room } from './models/room';
import { Store4 } from './store4';
import produce from 'immer';
import { State } from './models/state'

@Injectable({
  providedIn: 'root'
})
export class StateService4Service extends Store4 {
  rooms$: Observable<Room[]> = this.select<Room[]>('rooms');

  filter$: Observable<Filter> = this.select<Filter>('filter');

  selected$: Observable<number[]> = this.select<number[]>('selected');

  constructor() {
    super()
  }

  currentValue() {
    return this.value;
  }

  select_room(id: number): Observable<Room>{
    return this.observable.pipe(
      map((x: State) => x.rooms.find(r => r.id === id))
    );
  }

  modify(room: Room) {
    const currentRooms: Room[] = this.value.rooms;
    const updatedRooms = produce(currentRooms, draft => {
      const i = draft.findIndex(r => r.id === room.id);
      draft[i] = room;
    });
    this.set('rooms', updatedRooms);
  }

  setRooms(rooms: ReadonlyArray<Room>) {
    this.set('rooms', rooms);
  }

  create(room: Room) {
    //this.store.value.rooms.push(room); // testing whether readonly works

    const currentRooms: Room[] = this.value.rooms;
    const updatedRooms = produce(currentRooms, draft => {
      draft.push(room);
    });
    this.set('rooms', updatedRooms);
  }

  delete(id: number) {
    const currentRooms: Room[] = this.value.rooms;
    const updatedRooms = produce(currentRooms, draft => draft = draft.filter(r => r.id !== id));
    this.set('rooms', updatedRooms);
  }

  resetSelected() {
    this.set('selected', []);
  }

  setSelected(selected: number[]) {
    this.set('selected', selected);
    console.log(this.value);
  }

  updateFilter(filter: Filter) {
    this.set('filter', filter);
  }

}
