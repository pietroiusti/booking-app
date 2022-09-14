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
  modifiedNameControl = new FormControl('');
  modifiedCapacityControl = new FormControl('');
  modifiedDisplayControl = new FormControl('');
  modifiedWhiteBoardControl = new FormControl('');
  modifiedAirConditioningControl = new FormControl('');

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
  }

  applyChanges() {
    if (!this.id)
      return;

    let obj: { id: number;
               name: string | null;
               capacity: string | null;
               display: string | null;
               whiteboard: string | null;
               air: string | null;
              } = {
      id: this.id,
      name: this.modifiedNameControl.value,
      capacity: this.modifiedCapacityControl.value,
      display: this.modifiedDisplayControl.value,
      whiteboard: this.modifiedWhiteBoardControl.value,
      air: this.modifiedAirConditioningControl.value,
    }

    this.roomService.modifyRoom(obj);
  }

  ngOnInit(): void { }

}
