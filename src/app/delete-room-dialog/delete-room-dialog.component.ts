import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RoomService } from '../room.service';

@Component({
  selector: 'app-delete-room-dialog',
  templateUrl: './delete-room-dialog.component.html',
  styleUrls: ['./delete-room-dialog.component.css']
})
export class DeleteRoomDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {[k: string]: any},
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
  }

  applyChanges() {
    console.log('hello world');
    //this.roomService.deleteRoom(this.data['id']);
    this.roomService.deleteRoom2(this.data['id']);
  }

}
