import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Room } from '../models/room'
import { RoomService } from '../room.service';
import { Store } from '../store';

@Component({
  selector: 'app-create-room-dialog2',
  templateUrl: './create-room-dialog2.component.html',
  styleUrls: ['./create-room-dialog2.component.css']
})
export class CreateRoomDialog2Component implements OnInit {
  rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  fg = this.fb.nonNullable.group({
    id: [-1],
    name: ['', [Validators.required, Validators.minLength(5)]],
    capacity: [undefined, [Validators.required, Validators.max(50), Validators.min(1)]],
    display: [false],
    whiteboard: [false],
    airConditioning: [false],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<CreateRoomDialog2Component>,
  ) { }

  ngOnInit(): void {
    this.rooms$.subscribe((rooms)=>{
      this.fg.patchValue({id: rooms.length+1});
    });
  }

  fgSubmit() {
    if (!this.fg.valid) {
      return;
    }

    if (this.fg.value.id === -1 ||
      this.fg.value.id === undefined ||
      this.fg.value.name === undefined ||
      this.fg.value.display === undefined ||
      this.fg.value.whiteboard === undefined ||
      this.fg.value.airConditioning === undefined ||
      this.fg.value.capacity === undefined )
      return;

    this.roomService.createRoom2({
      id: this.fg.value.id,
      name: this.fg.value.name,
      display: this.fg.value.display,
      whiteboard: this.fg.value.whiteboard,
      airConditioning: this.fg.value.airConditioning,
      capacity: this.fg.value.capacity,
      bookings: [],
    });

    this.dialogRef.close();
  }

}
