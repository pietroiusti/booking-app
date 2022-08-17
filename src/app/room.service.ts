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
}
