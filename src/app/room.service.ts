import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from './store';

import { Room } from './models/room';

import { catchError, tap } from 'rxjs/operators';
import { Booking } from './models/booking';
import { TimeFrame } from './models/time-frame';

import { MatSnackBar } from '@angular/material/snack-bar';
import produce from 'immer';
import { Router } from '@angular/router';

import { ActionHandlerService } from './action-handler.service';

import { isEqual } from 'lodash';
import { StateService4Service } from './state-service4.service';

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
    private _snackBar: MatSnackBar,
    private router: Router,
    private actionHandler: ActionHandlerService,
    private stateService4Service: StateService4Service,
  ) {}

  getRooms$: Observable<Room[]> = this.http.get<Room[]>(this.roomsUrl)
    .pipe(
      //tap(next => this.actionHandler.setRooms(next))
      tap(next => this.stateService4Service.setRooms(next))
    );

  book3(room: Room, start: number, end: number): Observable<any> | null {
    // create booking
    let booking = this.createBooking(start, end);
    // assess booking
    let assessment = this.assessBooking(room.bookings, booking);
    // book
    if (assessment) {
      console.log('Assessment okay');
      this._snackBar.open('Your booking looked good. Waiting for server...', 'Got it');

      const updatedRoom = produce(room, draft => {
        draft.bookings.push(booking);
      });

      let httpOptions = {
        headers: new HttpHeaders({
          'observe': 'response',
        })
      };

      return this.http.put<{ result: string }>(this.roomsUrl, updatedRoom, httpOptions)
        .pipe(
          tap((v) => {
            if (v.result === `All good`) {
              setTimeout(() => {
                this._snackBar.open('Success! :)', 'Got it');
                //this.actionHandler.modify(updatedRoom);
                this.stateService4Service.modify(updatedRoom);
              }, 2000);
            } else {
              setTimeout(() => {
                this._snackBar.open('Something went wrong on the server :(', 'Got it');
              }, 2000);
            }
          }),
          catchError(this.handleError<any>('book function')),
        );
    } else {
      console.log('Assessment failed');
      this._snackBar.open('There was something wrong with your booking :( Try again', 'Okay');
      return null;
    }
  }

  bookMultiple3(rooms: Room[], date: string, from: string, to: string) {

    let booking = this.createBooking(this.unixTimeStamp(date, from), this.unixTimeStamp(date, to));

    let reqs = [];

    let httpOptions3 = {
      headers: new HttpHeaders({
        'observe': 'response',
      })
    };

    let updatedRooms: Room[] = [];

    for (let r of rooms) {
      /*
      // without immer.js:
      const updatedBookings = [...r.bookings]
      updatedBookings.push(booking);
      const updatedRoom = Object.assign({}, r);
      updatedRoom.bookings = updatedBookings;
      */

      const updatedRoom = produce(r, draft => {
        draft.bookings.push(booking);
      });

      updatedRooms.push(updatedRoom);

      let req = this.http.put(this.roomsUrl, updatedRoom, httpOptions3)
        .pipe(
          tap(_ => console.log(`New booking for room ${r.id}`)),
          catchError(this.handleError<any>('book function')));
      reqs.push(req);
    }

    // I am not (re-)assessing the bookings here at the moment

    return forkJoin(reqs).pipe(
      tap(v => {
        if (v.every(o => o.result === 'All good')) {
          this._snackBar.open('All good! :)', 'Got it');
          for (let r of updatedRooms) {
            //this.actionHandler.modify(r);
            this.stateService4Service.modify(r);
          }
        } else {
          const nonUpdatedRooms = v.filter(r => r.result !== 'All good');

          this._snackBar.open('Something went wrong :( See log to see which bookings have failed', 'Okay');
          console.log('Error: The following rooms have not been booked:');
          for (let r of nonUpdatedRooms) {
            console.log(r.id);
          }
        }
      })
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

      return of(result as T);
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

  unixTimeStamp(date: string, time: string) {
    return Date.parse(date + 'T' + time + ':00' + '.000+02:00');
  }

  assessBooking(roomBookings: Booking[], newBooking: Booking): boolean {
    // Check if booking start time is before end time
    function startBeforeEnd(booking: Booking): boolean {
      if (booking.timeFrame.start < booking.timeFrame.end) {
        console.log('startBeforeEnd(): true');
        return true;
      } else {
        console.log('startBeforeEnd(): false');
        return false;
      }
    }

    // Check whether booking overlaps with another booking
    function overlap(roomBookings: Booking[], b: Booking): boolean {
      function framesOverlap(tf1: TimeFrame, tf2: TimeFrame): boolean {
        // Checking overlap:
        //      |----tf1----|
        // |---------tf2---------|
        if ((tf2.start <= tf1.start) && (tf2.end >= tf1.end))
          return true;

        // Checking overlap:
        // |---------tf1---------|
        //      |----tf2----|
        if ((tf2.start >= tf1.start) && (tf2.start < tf1.end)
          &&
          (tf2.end > tf1.start) && (tf2.end <= tf1.end))
          return true;

        // Checking overlap:
        //       |----tf1----|
        // |----tf2----|
        if ((tf2.start <= tf1.start) && (tf2.end > tf1.start))
          return true;

        // Checking overlap:
        // |----tf1----|
        //       |----tf2----|
        if ((tf2.start < tf1.end) && (tf2.end >= tf1.end))
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

    if (!startBeforeEnd(newBooking)) {
      return false;
    }

    if (overlap(roomBookings, newBooking)) {
      return false;
    }

    // TODO: add more tests (e.g., forbid booking for past times)

    return true;
  }

  createModifyRoom2(room: Room) {

    let httpOptions = {
      headers: new HttpHeaders({
        'observe': 'response',
      })
    };

    //const currentRoom = this.store.value.rooms.find(r => r.id === room.id);
    const currentRoom = this.stateService4Service.currentValue().rooms.find((r: Room) => r.id === room.id);
    //debugger
    if (currentRoom) {

      if (isEqual(currentRoom, room)) {
        this._snackBar.open('Nothing to update!', 'okay');
        return;
      }

      this.http.put<{ result: string }>(this.roomsUrl, room, httpOptions)
        .subscribe(v => {
          console.log(v);
          if (v.result === 'All good') {
            console.log('All good :)');
            this._snackBar.open('Room successfully modified :)', 'Got it');
            //this.actionHandler.modify(room);
            this.stateService4Service.modify(room);
          } else {
            console.log('Something went wrong :(');
            this._snackBar.open('Something went wrong :(', 'Got it');
          }
        });

    } else { // CREATE/POST

      this.http.post<any>(this.roomsUrl, room, httpOptions)
        .subscribe(res => {
          console.log(res);

          if (res.result == 'All good') {
            let newRoom: Room = res.room;

            //this.actionHandler.create(newRoom);
            this.stateService4Service.create(newRoom);

            this._snackBar.open('Room successfully created!', 'Okay');
          } else {
            console.log('something wrong...');
          }
        });
    }
  }

  deleteRoom2(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'observe': 'response',
      })
    };

    const reqObj = {
      val: id,
    }

    let url = this.roomsUrl + '/' + id.toString();

    this.http.delete<any>(url, httpOptions)
      .subscribe(res => {
        if (res.result === 'All good') {
          //this.actionHandler.delete(id);
          this.stateService4Service.delete(id);
          this._snackBar.open('Room Successfully Deleted!', 'Got it');
          this.router.navigate(['/rooms']);
        } else {
          this._snackBar.open('Something went wrong :(', 'Okay');
        }
      });
  }

  //todo?
  
  deleteRooms(arr: Number[]) {
    console.log(arr);

    const reqs = [];
    console.log(this.store.value['selected']);

    // TODO
    console.log('TODO');

    this.store.value.rooms.forEach(r => {

    });

    }
  
}
