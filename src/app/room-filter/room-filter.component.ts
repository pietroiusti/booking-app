import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '../store';

import { FilterService } from '../filter.service';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent implements OnInit, OnDestroy {

  filter: Object | null = null;
  filter$: Observable<any> | null = null;

  @Output() filterInitEvent: EventEmitter<any> = new EventEmitter();

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

  constructor(
    private store: Store,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.filter$ = this.store.select<any>('filter');
    this.filter$.subscribe(filter => {
      console.log(filter);
      this.filter = filter
    });
  }

  ngOnDestroy(): void {
    this.filterService.reset();
  }
}
