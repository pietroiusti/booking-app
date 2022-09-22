import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Room } from '../models/room'
import { RoomService } from '../room.service';
import { Store } from '../store';

@Component({
  selector: 'app-create-modify-room-dialog',
  templateUrl: './create-modify-room-dialog.component.html',
  styleUrls: ['./create-modify-room-dialog.component.css']
})
export class CreateModifyRoomDialogComponent implements OnInit {
  errorGeneralMessage: boolean = false;

  rooms$: Observable<Room[]> = this.store.select<Room[]>('rooms');

  fg = this.fb.nonNullable.group({
    id: [-1],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    capacity: [-1, [Validators.required, Validators.max(40), Validators.min(1)]],
    display: [false],
    whiteboard: [false],
    airConditioning: [false],
    bookings: ['[]'],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<CreateModifyRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type: string, room: Room|undefined},
  ) { }

  ngOnInit(): void {


    if (this.data) { // modify
      if (!this.data.room)
        return;

      this.fg.setValue({
        ...this.data.room,
        bookings: JSON.stringify(this.data.room.bookings),
      });

    } else { // create
      this.rooms$.subscribe((rooms) => {
        this.fg.patchValue({
          id: rooms.length + 1,
          capacity: 1,
        });
      });
    }

  }

  fgSubmit() {
    if (!this.fg.valid) {
      this.errorGeneralMessage = true;
      setTimeout(()=>this.errorGeneralMessage = false, 2000);
      return;
    }

    if (this.fg.value.id === -1 ||
      this.fg.value.id === undefined ||
      this.fg.value.name === undefined ||
      this.fg.value.display === undefined ||
      this.fg.value.whiteboard === undefined ||
      this.fg.value.airConditioning === undefined ||
      this.fg.value.capacity === undefined ||
      this.fg.value.bookings === undefined )
      return;

    // //CAN YOU BE SHORTER ?
    // if (this.fg.value.id === -1)
    //   return;
    // if (Object.values( this.fg.value ).some( v => v === undefined ))
    //   return;

    this.roomService.createModifyRoom2({
      id: this.fg.value.id,
      name: this.fg.value.name,
      display: this.fg.value.display,
      whiteboard: this.fg.value.whiteboard,
      airConditioning: this.fg.value.airConditioning,
      capacity: this.fg.value.capacity,
      bookings: JSON.parse(this.fg.value.bookings),
    });

    this.dialogRef.close();
  }

}
