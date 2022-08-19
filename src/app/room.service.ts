import { Injectable } from '@angular/core';
import { Room } from './room';
import { ROOMDATA } from './mock-rooms-data';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  getRoomData(): Room[] {
    return ROOMDATA;
  }

  getRoom(id: string | undefined): Room | undefined {
    let room = ROOMDATA.find(obj => obj.id.toString() === id);
    return room;
  }
}
