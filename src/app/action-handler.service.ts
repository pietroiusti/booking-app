import { Injectable } from '@angular/core';

import { Store } from './store';

import produce from 'immer';


@Injectable({
  providedIn: 'root'
})
export class ActionHandlerService {

  constructor(
    private store: Store
  ) { }

  delete(id: number) {
    const currentRooms = this.store.value.rooms;
    const updatedRooms = produce(currentRooms, draft => draft = draft.filter(r => r.id !== id));
    this.store.set('rooms', updatedRooms);
  }
}
