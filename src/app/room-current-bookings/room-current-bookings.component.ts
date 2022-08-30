import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Room } from '../models/room';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCurrentBookingsComponent implements OnInit {
  room: Room | null = null;
  @Input() room$: Observable<Room> | undefined;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.room$) {
      this.room$.subscribe(room => {
          this.room = room;
          this.cd.markForCheck();
      });
    }
  }
}
