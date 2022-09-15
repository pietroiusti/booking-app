import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-modify-room-dialog',
  templateUrl: './modify-room-dialog.component.html',
  styleUrls: ['./modify-room-dialog.component.css']
})
export class ModifyRoomDialogComponent implements OnInit {
  id: number | null = null;

  // current values:
  //name: string | null = null;
  //capacity: string | null = null;

  modifiedNameControl = new FormControl(''); // <<< change these names
  modifiedCapacityControl = new FormControl('');
  modifiedDisplayControl = new FormControl('');
  modifiedWhiteBoardControl = new FormControl('');
  modifiedAirConditioningControl = new FormControl('');
  bookingsControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {[k: string]: any},
    private roomService: RoomService,
  ){
    this.id = data['id'];
    this.modifiedNameControl.setValue(data['name']);
    this.modifiedCapacityControl.setValue(data['capacity'].toString());
    this.modifiedDisplayControl.setValue(data['display'].toString());
    this.modifiedWhiteBoardControl.setValue(data['whiteboard'].toString());
    this.modifiedAirConditioningControl.setValue(data['airConditioning'].toString());
    this.bookingsControl.setValue(JSON.stringify(data['bookings']));
  }

  applyChanges() {
    if (!this.id)
      return;

    if ( ! (this.modifiedNameControl.value        &&
            this.modifiedCapacityControl.value    &&
            this.modifiedDisplayControl.value     &&
            this.modifiedWhiteBoardControl.value  &&
            this.modifiedAirConditioningControl.value) )
      return;

    let obj: {
               id: number;
               name: string;
               capacity: string;
               display: string;
               whiteboard: string;
               air: string;
               bookings: string,
              } = {
      id: this.id,
      name: this.modifiedNameControl.value,
      capacity: this.modifiedCapacityControl.value,
      display: this.modifiedDisplayControl.value,
      whiteboard: this.modifiedWhiteBoardControl.value,
      air: this.modifiedAirConditioningControl.value,
      bookings: this.bookingsControl.value?this.bookingsControl.value:'',
    }

    this.roomService.modifyRoom(obj);
  }

  ngOnInit(): void { }

}
