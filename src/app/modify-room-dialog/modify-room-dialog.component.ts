import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../room.service';

import { Room } from '../models/room';

@Component({
  selector: 'app-modify-room-dialog',
  templateUrl: './modify-room-dialog.component.html',
  styleUrls: ['./modify-room-dialog.component.css']
})
export class ModifyRoomDialogComponent implements OnInit {
  id: number | null = null;
  nameControl = new FormControl<string | null>('');
  bookingsControl = new FormControl<string | null>('');
  capacityControl = new FormControl<number | null>(null);
  displayControl = new FormControl<boolean | null>(false);
  whiteBoardControl = new FormControl<boolean | null>(false);
  airConditioningControl = new FormControl<boolean | null>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { [k: string]: any },
    private roomService: RoomService,
  ) {
    this.id = data['id'];
    this.nameControl.setValue(data['name']);
    this.bookingsControl.setValue(JSON.stringify(data['bookings']));
    this.capacityControl.setValue(data['capacity']);
    this.displayControl.setValue(data['display']);
    this.whiteBoardControl.setValue(data['whiteboard']);
    this.airConditioningControl.setValue(data['airConditioning']);
  }

  applyChanges() {
    if (!this.id)
      return;

    if (this.nameControl.value === null ||
      this.capacityControl.value === null ||
      this.displayControl.value === null ||
      this.whiteBoardControl.value === null ||
      this.airConditioningControl.value === null ||
      this.bookingsControl.value === null)
      return;

    let updatedRoom: Room = {
      id: this.id,
      name: this.nameControl.value,
      capacity: this.capacityControl.value,
      display: this.displayControl.value,
      whiteboard: this.whiteBoardControl.value,
      airConditioning: this.airConditioningControl.value,
      bookings: JSON.parse(this.bookingsControl.value),
    };

    this.roomService.modifyRoom(updatedRoom);
  }

  ngOnInit(): void {}

}
