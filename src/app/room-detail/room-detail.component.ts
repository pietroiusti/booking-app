import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../models/room';

import { Store } from '../store';
import { Observable, Subscription } from 'rxjs';
import { TimeFrameInput } from '../models/time-frame-input';
import { MatDialog } from '@angular/material/dialog';

import { ModifyRoomDialogComponent } from '../modify-room-dialog/modify-room-dialog.component';
import { DeleteRoomDialogComponent } from '../delete-room-dialog/delete-room-dialog.component';

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

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private store: Store,
    public dialog: MatDialog,
  ) {}

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

  handleNewBookingEvent3(input: TimeFrameInput): void {
    let UnixTimestampStartString = input.selectedDate + 'T' + input.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampStart = Date.parse(UnixTimestampStartString);
    let UnixTimestampEndString = input.selectedDate + 'T' + input.selectedTimeEnd + ':00' + '.000+02:00';
    let UnixTimestampEnd = Date.parse(UnixTimestampEndString);

    if (!this.room)
      return;

    let reqObsv = this.roomService.book3(this.room, UnixTimestampStart, UnixTimestampEnd);
    if (reqObsv)
      reqObsv.subscribe();
  }

  openDialog() {

    if (!this.room)
      return;

    const dRef = this.dialog.open(ModifyRoomDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        id: this.room.id,
        name: this.room.name,
        capacity: this.room.capacity,
        display: this.room.display,
        whiteboard: this.room.whiteboard,
        airConditioning: this.room.airConditioning,
        bookings: this.room.bookings,
      },
    });
    dRef.afterClosed().subscribe(v => {
      console.log('closed');
    })
  }

  openDeleteDialog() {
    const dRef = this.dialog.open(DeleteRoomDialogComponent, {
      data: {
        id: this.room?.id,
        name: this.room?.name,
      },
    });
    dRef.afterClosed().subscribe(v => {
      console.log('closed');
    })
  }

  goBack(): void {
    this.location.back();
  }
}
