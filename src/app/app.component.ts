import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CounterStateService } from './test-store2.service'

import { RoomService } from './room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Booking App';
  subscription: Subscription | null = null;

  constructor(
    private roomService: RoomService,
    private counterService: CounterStateService,
  ) { }

  ngAfterViewInit(): void {
    console.log('app component after init');
    this.subscription = this.roomService.getRooms$.subscribe();

    this.counterService.increment();
    this.counterService.increment();
    this.counterService.increment();
    this.counterService.log();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
