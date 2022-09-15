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

  newRoomId: number | null = null;
  rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  idControl = new FormControl('');
  nameControl = new FormControl('');
  capacityControl = new FormControl('');
  displayControl = new FormControl('');
  whiteboardControl = new FormControl('');
  airCondControl = new FormControl('');

  constructor(
    private roomService: RoomService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.rooms$.subscribe(rooms => {
      this.idControl.setValue((rooms.length + 1).toString());
    });
  }

  sendCreateRoomReq() {
    console.log('hello world');

    if ( ! ( this.idControl.value         &&
             this.nameControl.value       &&
             this.capacityControl.value   &&
             this.displayControl.value    && 
             this.whiteboardControl.value &&
             this.airCondControl.value ) )
      return;

    this.roomService.createRoom({
      id: this.idControl.value,
      name: this.nameControl.value,
      capacity: this.capacityControl.value,
      display: this.displayControl.value, 
      whiteboard: this.whiteboardControl.value,
      airConditioning: this.airCondControl.value,
    });

  }

}
