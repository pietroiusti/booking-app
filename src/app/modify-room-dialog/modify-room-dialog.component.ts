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

  modifiedNameControl = new FormControl('');
  bookingsControl = new FormControl('');
  modifiedCapacityControl = new FormControl(null);
  modifiedDisplayControl = new FormControl(false);
  modifiedWhiteBoardControl = new FormControl(false);
  modifiedAirConditioningControl = new FormControl(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { [k: string]: any },
    private roomService: RoomService,
  ) {
    this.id = data['id'];
    this.modifiedNameControl.setValue(data['name']);
    this.bookingsControl.setValue(JSON.stringify(data['bookings']));
    this.modifiedCapacityControl.setValue(data['capacity']);
    this.modifiedDisplayControl.setValue(data['display']);
    this.modifiedWhiteBoardControl.setValue(data['whiteboard']);
    this.modifiedAirConditioningControl.setValue(data['airConditioning']);
  }

  applyChanges() {
    if (!this.id)
      return;

    if (this.modifiedNameControl.value === null ||
      this.modifiedCapacityControl.value === null ||
      this.modifiedDisplayControl.value === null ||
      this.modifiedWhiteBoardControl.value === null ||
      this.modifiedAirConditioningControl.value === null ||
      this.bookingsControl.value === null)
      return;

    let updatedRoom: Room = {
      id: this.id,
      name: this.modifiedNameControl.value,
      capacity: this.modifiedCapacityControl.value,
      display: this.modifiedDisplayControl.value,
      whiteboard: this.modifiedWhiteBoardControl.value,
      airConditioning: this.modifiedAirConditioningControl.value,
      bookings: JSON.parse(this.bookingsControl.value),
    };

    this.roomService.modifyRoom(updatedRoom);
  }

  ngOnInit(): void {}

}
