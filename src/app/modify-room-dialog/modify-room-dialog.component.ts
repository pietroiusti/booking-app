import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-room-dialog',
  templateUrl: './modify-room-dialog.component.html',
  styleUrls: ['./modify-room-dialog.component.css']
})
export class ModifyRoomDialogComponent implements OnInit {

  modifiedNameControl = new FormControl('');
  modifiedCapacityControl = new FormControl('');
  modifiedDisplayControl = new FormControl('');
  modifiedWhiteBoardControl = new FormControl('');
  modifiedAirConditioningControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {[k: string]: any}
  ){
    console.log(data);
    this.modifiedNameControl.setValue(data['name']);
    this.modifiedCapacityControl.setValue(data['capacity']);
    this.modifiedDisplayControl.setValue(data['display']);
    this.modifiedWhiteBoardControl.setValue(data['whiteboard']);
    this.modifiedAirConditioningControl.setValue(data['airConditioning']);
  }

  applyChanges() {
    console.log(this.modifiedNameControl.value);
    console.log(this.modifiedCapacityControl.value);
    console.log(this.modifiedDisplayControl.value);
    console.log(this.modifiedWhiteBoardControl.value);
    console.log(this.modifiedAirConditioningControl.value);
  }

  ngOnInit(): void { }

}
