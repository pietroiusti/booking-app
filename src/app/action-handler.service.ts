import { Injectable } from '@angular/core';

import { Store } from './store';

import produce from 'immer';

import { Room } from './models/room';

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

  setRooms(rooms: Room[]) {
    this.store.set('rooms', rooms);
  }

  create(room: Room) {
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
}
