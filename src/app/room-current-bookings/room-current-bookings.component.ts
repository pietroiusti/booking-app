import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Room } from '../models/room';

@Component({
  selector: 'app-room-current-bookings',
  templateUrl: './room-current-bookings.component.html',
  styleUrls: ['./room-current-bookings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCurrentBookingsComponent implements OnInit, OnDestroy {
  room: Room | null = null;

  @Input() room$: Observable<Room> | undefined;

  subscription: Subscription | null = null;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.room$) {
      this.subscription = this.room$.subscribe(room => {
          this.room = room;
          this.cd.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }
}
