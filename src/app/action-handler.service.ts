import { Injectable } from '@angular/core';

import { Store } from './store';

import produce from 'immer';

import { Room } from './models/room';

import { Filter } from './models/filter';

@Injectable({
  providedIn: 'root'
})
export class ActionHandlerService {

  constructor(
    private store: Store
  ) { }

  modify(room: Room) {
    const currentRooms = this.store.value.rooms;
    const updatedRooms = produce(currentRooms, draft => {
      const i = draft.findIndex(r => r.id === room.id);
      draft[i] = room;
    });
    this.store.set('rooms', updatedRooms);
  }

  setRooms(rooms: ReadonlyArray<Room>) {
    this.store.set('rooms', rooms);
  }

  create(room: Room) {
    //this.store.value.rooms.push(room); // testing whether readonly works

    const currentRooms = this.store.value.rooms;
    const updatedRooms = produce(currentRooms, draft => {
      draft.push(room);
    });
    this.store.set('rooms', updatedRooms);
  }

  delete(id: number) {
    const currentRooms = this.store.value.rooms;
    const updatedRooms = produce(currentRooms, draft => draft = draft.filter(r => r.id !== id));
    this.store.set('rooms', updatedRooms);
  }

  resetSelected() {
    this.store.set('selected', []);
  }

  setSelected(selected: number[]) {
    this.store.set('selected', selected);
    console.log(this.store.value);
  }

  updateFilter(filter: Filter) {
    this.store.set('filter', filter);
  }


}
