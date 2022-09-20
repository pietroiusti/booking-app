import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../room.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Room } from '../models/room';

@Component({
  selector: 'app-modify-room-dialog2',
  templateUrl: './modify-room-dialog2.component.html',
  styleUrls: ['./modify-room-dialog2.component.css']
})
export class ModifyRoomDialog2Component implements OnInit {
  id: number | null = null;

  fg = new FormGroup({
    nameControl: new FormControl<string>('', {nonNullable: true}),

    capacityControl: new FormControl<number|null>(null),

    displayControl: new FormControl<boolean>(false, {nonNullable: true}),

    whiteBoardControl: new FormControl<boolean>(false, {nonNullable: true}),

    airConditioningControl: new FormControl<boolean>(false, {nonNullable: true}),

    bookingsControl: new FormControl<string>('', {nonNullable: true}),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Room,
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
    //this.fg.setValue(data)
  }

  ngOnInit(): void {

  }

  fgSubmit() {
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
  }

}
