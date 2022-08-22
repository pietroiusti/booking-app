import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Room } from './room';

import { catchError, map, tap } from 'rxjs/operators';

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
  ) { }

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
}
