import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { Location } from '@angular/common';

import { Room } from '../room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class
RoomDetailComponent implements OnInit {
  id: number | undefined;
  room: Room | undefined;

  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
  ) { }

  ngOnInit(): void {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.getRoom();
  }

  handleNewBookingEvent() {
    console.log('handleNewBookingEvent()');
    this.getRoom();
  }

  getRoom() {
    if (this.id){
      this.roomService.getRoom(this.id.toString())
        .subscribe(room => {
          this.room = room;
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
