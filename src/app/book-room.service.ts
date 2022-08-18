import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookRoomService {

  constructor() { }

  book() {
    console.log('booking!');
  }
}
