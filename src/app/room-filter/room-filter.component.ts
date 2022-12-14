import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from '../store';

import { FilterService } from '../filter.service';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  filter: Filter | null = null;
  filter$: Observable<Filter> = this.store.select<Filter>('filter');

  subscription: Subscription | null = null;

  constructor(
    private store: Store,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.subscription = this.filter$.subscribe(filter => {
      this.filter = filter
    });
  }

  handleNameInput(event: Event) {
    let userInput = (((event as InputEvent).target) as HTMLInputElement).value;
    this.filterService.handleInput({type: 'name', value: userInput});
  }

  handleAcInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.filterService.handleInput({type: 'ac', value: isChecked});
  }

  handleWbInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.filterService.handleInput({type: 'wb', value: isChecked});
  }

  handleDisplayInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.filterService.handleInput({type: 'display', value: isChecked});
  }

  handleTimeFrameDateInput(event: Event) {
    let val = ((event as Event).target as HTMLInputElement).value;
    this.filterService.handleInput({type: 'date', value: val});
  }

  handleTimeFrameFromInput(event: Event) {
    let val = ((event as Event).target as HTMLInputElement).value;
    this.filterService.handleInput({type: 'from', value: val});
  }

  handleTimeFrameToInput(event: Event) {
    let val = ((event as Event).target as HTMLInputElement).value;
    this.filterService.handleInput({type: 'to', value: val});
  }

  handleCapacityInput(val: string) {
    this.filterService.handleInput({type: 'capacity', value: val});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.filterService.reset();
  }
}
