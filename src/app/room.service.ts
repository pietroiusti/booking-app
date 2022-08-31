import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from './store';

import { Room } from './models/room';

import { catchError, tap } from 'rxjs/operators';
import { Booking } from './models/booking';
import { TimeFrame } from './models/time-frame';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsUrl = 'http://localhost:3000/rooms';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  getRooms$: Observable<Room[]> = this.http.get<Room[]>(this.roomsUrl)
    .pipe(
      tap(next => this.store.set('rooms', next))
    );

  // create booking, assess it, and, if it's all okay, book
  book(room: Room, start: number, end: number) {
    // create booking
    let booking = this.createBooking(start, end);
    // assess booking
    let assessment = this.assessBooking(room.bookings, booking);
    // book
    if (assessment) {
      console.log('Booking accepted');
      room = Object.assign({}, room); // shallow copy
      room.bookings.push(booking);
      this.updateRooms(room);
    } else {
      console.log('Booking rejected');
    }
  }

  updateRooms(updatedRoom: Room): void {
    console.log('updateRooms()');

    let httpOptions2 = {
      headers : new HttpHeaders ({
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    })};
    //https://stackoverflow.com/questions/25727306/request-header-field-access-control-allow-headers-is-not-allowed-by-access-contr


    // 1. Send req to server to change data
    this.http.put(this.roomsUrl, updatedRoom, httpOptions2)
      .pipe(
        tap(_ => console.log(`New booking for room ${updatedRoom.id}`)),
        catchError(this.handleError<any>('book function')),
      ).subscribe(v => {
                // 2. When successful, update local store
                let value = this.store.value.rooms;
                let rooms = value.map((room: Room) => {
                  if (room.id === updatedRoom.id) {
                    return { ...room, ...updatedRoom };
                  } else {
                    return room;
                  }
                });
                this.store.set('rooms', rooms);
      })
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by return an empty result
      return of (result as T);
    };
  }

  // take unix timestamps
  createBooking(start: number, end: number): Booking {
    return {
      person: { // <<<<< logged person (TODO)
        name: 'John',
        surname: 'McBar',
        role: 'Software Engineer',
      },
      timeFrame: { start, end },
    };
  }

  assessBooking(roomBookings: Booking[], newBooking: Booking): boolean {
    // Check if booking start time is before end time
    function startBeforeEnd (booking: Booking): boolean {
      if ( booking.timeFrame.start < booking.timeFrame.end ) {
        console.log('startBeforeEnd(): true');
        return true;
      } else {
        console.log('startBeforeEnd(): false');
        return false;
      }
    }

    // Check whether booking overalaps with another booking
    function overlap(roomBookings: Booking[], b: Booking): boolean {
      function framesOverlap(tf1: TimeFrame, tf2: TimeFrame): boolean {
        // Checking overlap:
        //      |----tf1----|
        // |---------tf2---------|
        if ( (tf2.start <= tf1.start) && (tf2.end >= tf1.end) )
          return true;

        // Checking overlap:
        // |---------tf1---------|
        //      |----tf2----|
        if ( (tf2.start >= tf1.start) && (tf2.start < tf1.end)
                                      &&
            (tf2.end > tf1.start)    && (tf2.end <= tf1.end) )
            return true;

        // Checking overlap:
        //       |----tf1----|
        // |----tf2----|
        if ( (tf2.start <= tf1.start) && (tf2.end > tf1.start) )
          return true;

        // Checking overlap:
        // |----tf1----|
        //       |----tf2----|
        if ( (tf2.start < tf1.end) && (tf2.end >= tf1.end) )
          return true;

        // Time frames do not overlap
        // |----tf1(2)----|     |----tf2(1)----|
        return false;
      }

      for (let booking of roomBookings) {
        if (framesOverlap(booking.timeFrame, b.timeFrame)) {
          return true;
        }
      }

      return false;
    }

    if (! startBeforeEnd(newBooking)) {
      return false;
    }

    if ( overlap(roomBookings, newBooking) ) {
      return false;
    }

    // TODO: add more tests (e.g., forbid booking for past times)

    return true;
  }
}
