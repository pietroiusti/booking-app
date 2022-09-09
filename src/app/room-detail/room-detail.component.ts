import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';

import { Store } from '../store';
import { Observable, Subscription } from 'rxjs';
import { TimeFrameInput } from '../models/time-frame-input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
  RoomDetailComponent implements OnInit, OnDestroy {
  id!: number;

  room: Room | null = null;
  room$: Observable<Room> | undefined;

  subscription: Subscription | null = null;

  snackBarText1: string = "";
  snackBarText2: string = "";

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private store: Store,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.room$ = this.store.select_room(this.id);
    this.subscription = this.room$.subscribe(room => {
      console.log('room$ observer');
      this.room = room;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleNewBookingEvent(input: TimeFrameInput): void {
    let UnixTimestampStartString = input.selectedDate + 'T' + input.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampStart = Date.parse(UnixTimestampStartString);
    let UnixTimestampEndString = input.selectedDate + 'T' + input.selectedTimeEnd + ':00' + '.000+02:00';
    let UnixTimestampEnd = Date.parse(UnixTimestampEndString);

    if (this.room) {
      //this.roomService.book(this.room, UnixTimestampStart, UnixTimestampEnd); //<<<<<<<<<<<<<<<<

      // #########
      let reqObsv = this.roomService.book2(this.room, UnixTimestampStart, UnixTimestampEnd);
      
      if (reqObsv) {
        reqObsv.subscribe( v => {
          //console.log('I should update local store');          
          if (this.room) {
            this._snackBar.open('Booking successful');
            this.roomService.updateStore(this.room, UnixTimestampStart, UnixTimestampEnd);
          } else {
            ;
          }
        })
      } else {
        this._snackBar.open('There was something wrong with your booking :( Try again');  
      }      
    }
    // ##########

  }

  goBack(): void {
    this.location.back();
  }
}
