import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

import { RoomService } from '../room.service';
import { Store } from '../store';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.css']
})
export class CreateRoomDialogComponent implements OnInit {

  rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl<string | null>('');
  capacityControl = new FormControl<number | null>(null);
  displayControl = new FormControl<boolean | null>(false);
  whiteboardControl = new FormControl<boolean | null>(false);
  airCondControl = new FormControl<boolean | null>(false);

  constructor(
    private roomService: RoomService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.rooms$.subscribe(rooms => {
      this.idControl.setValue((rooms.length + 1));
    });
  }

  sendCreateRoomReq() {
    if ( ! ( this.idControl.value  !== null &&
      this.nameControl.value       !== null &&
      this.capacityControl.value   !== null &&
      this.displayControl.value    !== null &&
      this.whiteboardControl.value !== null &&
      this.airCondControl.value    !== null) ) {
      console.log('Not gonna req!');
      return;
    }

    this.roomService.createRoom2({
      id: this.idControl.value,
      name: this.nameControl.value,
      display: this.displayControl.value,
      whiteboard: this.whiteboardControl.value,
      airConditioning: this.airCondControl.value,
      capacity: this.capacityControl.value,
      bookings: []
    });
  }

}
