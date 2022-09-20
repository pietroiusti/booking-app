import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../room.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Room } from '../models/room';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-modify-room-dialog2',
  templateUrl: './modify-room-dialog2.component.html',
  styleUrls: ['./modify-room-dialog2.component.css']
})
export class ModifyRoomDialog2Component implements OnInit {
  id: number | null = null;

  fg = new FormGroup({
    nameControl: new FormControl<string|null>(''),
    capacityControl: new FormControl<number|null>(null),
    displayControl: new FormControl<boolean|null>(null),
    whiteBoardControl: new FormControl<boolean|null>(null),
    airConditioningControl: new FormControl<boolean|null>(null),
    bookingsControl: new FormControl<string|null>(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { [k: string]: any },
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
    //debugger
    console.log(this.fg.value);

    if (this.id === null || this.id === undefined)
      return
    if (this.fg.value.nameControl === null || this.fg.value.nameControl === undefined)
      return;
    if (this.fg.value.capacityControl === null || this.fg.value.capacityControl === undefined)
      return;
    if (this.fg.value.displayControl === null || this.fg.value.displayControl === undefined)
      return;
    if (this.fg.value.whiteBoardControl === null || this.fg.value.whiteBoardControl === undefined)
      return;
    if (this.fg.value.airConditioningControl === null || this.fg.value.airConditioningControl === undefined)
      return;
    if (this.fg.value.bookingsControl === null || this.fg.value.bookingsControl === undefined)
      return;

    let updatedRoom: Room = {
      id: this.id,
      name: this.fg.value.nameControl,
      capacity: this.fg.value.capacityControl,
      display: this.fg.value.displayControl,
      whiteboard: this.fg.value.whiteBoardControl,
      airConditioning: this.fg.value.airConditioningControl,
      bookings: JSON.parse(this.fg.value.bookingsControl),
    }

    console.log(updatedRoom);

    this.roomService.modifyRoom(updatedRoom);
  }

}
