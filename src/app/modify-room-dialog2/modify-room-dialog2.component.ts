import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../room.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from '../models/room';

@Component({
  selector: 'app-modify-room-dialog2',
  templateUrl: './modify-room-dialog2.component.html',
  styleUrls: ['./modify-room-dialog2.component.css']
})
export class ModifyRoomDialog2Component implements OnInit {
  errorGeneralMessage: boolean = false;

  id: number | null = null;

  fg = new FormGroup({
    nameControl: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(5),// does not work?
      ],
      nonNullable: true
    }),

    capacityControl: new FormControl<number|null>(null, {
      validators: [
        Validators.required,
        Validators.max(50),
        Validators.min(1),
      ],
      nonNullable: true
    }),

    displayControl: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),

    whiteBoardControl: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),

    airConditioningControl: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true
    }),

    bookingsControl: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Room,
    private dialogRef: MatDialogRef<ModifyRoomDialog2Component>,
    private roomService: RoomService,
  ) {
    this.id = data['id'];
    this.fg.setValue({
      nameControl: data['name'],
      capacityControl: data['capacity'],
      displayControl: data['display'],
      whiteBoardControl: data['whiteboard'],
      airConditioningControl: data['airConditioning'],
      bookingsControl: JSON.stringify(data['bookings']),
    });
  }

  ngOnInit(): void {

  }

  fgSubmit() {
    if (!this.fg.valid) {
      this.errorGeneralMessage = true;
      setTimeout(()=>this.errorGeneralMessage = false, 2000);
      return;
    }

    if (this.id === null                                 ||
      this.fg.value.nameControl === undefined            ||
      this.fg.value.capacityControl === null             ||
      this.fg.value.capacityControl === undefined        ||
      this.fg.value.displayControl === undefined         ||
      this.fg.value.whiteBoardControl === undefined      ||
      this.fg.value.airConditioningControl === undefined ||
      this.fg.value.bookingsControl === undefined )
      return

    let updatedRoom: Room = {
      id: this.id,
      name: this.fg.value.nameControl,
      capacity: this.fg.value.capacityControl,
      display: this.fg.value.displayControl,
      whiteboard: this.fg.value.whiteBoardControl,
      airConditioning: this.fg.value.airConditioningControl,
      bookings: JSON.parse(this.fg.value.bookingsControl),
    }

    this.roomService.modifyRoom(updatedRoom);

    this.dialogRef.close();
  }

}
