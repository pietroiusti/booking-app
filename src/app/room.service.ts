import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from './store';

import { Room } from './models/room';

import { catchError, map, tap } from 'rxjs/operators';
import { Booking } from './models/booking';
import { TimeFrame } from './models/time-frame';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsUrl = 'api/rooms'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  // store related
  getRooms$ = this.http.get(this.roomsUrl)
    .pipe(
      tap(next => this.store.set('rooms', next))
    );

  // store related
  updateRooms(event: any) {
    if (event.room) { //<-- TODO why undefined sometimes?
      console.log('roomService.updateRooms');
      console.log(event);
      console.log(event.id);
      // 1. TODO send req to server to change data

      // 2. When successful, update local store
      let value = this.store.value.rooms;

      let rooms = value.map((room: Room) => {
        if (room.id === event.room.id) {
          return { ...room, ...event.room };
        } else {
          return room;
        }
      });

      this.store.set('rooms', rooms);
    }
  }

  getRoomsIds(): Observable<number[]> {
    //console.log('getRoomsIds');
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        map(arrOfRooms => arrOfRooms.map(r => r.id)),//<-- assess acceptability
      );
  }

  getRoomsData(): Observable<Room[]> {
    //console.log(`getRoomsData()`);
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        tap(_ => console.log('fetched rooms')),
        catchError(this.handleError<Room[]>('getRoomsData', [])),
      );
  }

  /** GET room by id. */
  getRoom(id: string): Observable<Room> {
    console.log(`getRoom(): ${this.roomsUrl}/${id}`);
    const url = `${this.roomsUrl}/${id}}`;
    return this.http.get<Room>(url).pipe(
      tap(_ => console.log(`fetched room ${id}`)),
      catchError(this.handleError<Room>(`getRoom id=${id}`)),
    );
  }

  // The mock web API knows which room to update by looking at the room's id
  book(r: Room): Observable<any> {
    console.log('book()');
    return this.http.put(this.roomsUrl, r, this.httpOptions)
      .pipe(
        tap(_ => console.log(`New booking for room ${r.id}`)),
        catchError(this.handleError<any>('book function')),
      );
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

    // todo: add more tests (e.g., forbid booking for past times)

    return true;
  }
}
