import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { ObservableFilter } from '../models/observable-filter';

import { Store } from '../store';

import { FilterService } from '../filter.service';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent implements OnInit {
  // #
  filter: Object | null = null;
  filter$: Observable<any> | null = null;
  // #

  nameSub$: Subject<string> = new Subject<string>()
  nameObsv$: Observable<string> =  this.nameSub$.asObservable();

  // air cond
  acSub$: Subject<boolean> = new Subject<boolean>();
  acObsv$: Observable<boolean> =  this.acSub$.asObservable();
  // white board
  wbSub$: Subject<boolean> = new Subject<boolean>();
  wbObsv$: Observable<boolean> =  this.wbSub$.asObservable();
  // display
  displaySub$: Subject<boolean> = new Subject<boolean>();
  displayObsv$: Observable<boolean> = this.displaySub$.asObservable();
  // time frame
  dateSub$: Subject<string> = new Subject<string>();
  dateObsv$: Observable<string> = this.dateSub$.asObservable();
  fromSub$: Subject<string> = new Subject<string>();
  fromObsv$: Observable<string> = this.fromSub$.asObservable();
  toSub$: Subject<string> = new Subject<string>();
  toObsv$: Observable<string> = this.toSub$.asObservable();

  @Output() filterInitEvent: EventEmitter<any> = new EventEmitter();

  handleNameInput(event: Event) {
    console.log('handleNameInputEvent()');
    let userInput = (((event as InputEvent).target) as HTMLInputElement).value;
    this.nameSub$.next(userInput);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'name', value: userInput});
    // #
  }

  handleAcInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.acSub$.next(isChecked);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'ac', value: isChecked});
    // #
  }

  handleWbInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.wbSub$.next(isChecked);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'wb', value: isChecked});
    // #
  }

  handleDisplayInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.displaySub$.next(isChecked);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'display', value: isChecked});
    // #
  }

  handleTimeFrameDateInput(event: Event) {
    let val = ((event as Event).target as HTMLInputElement).value;
    this.dateSub$.next(val);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'date', value: val});
    // #
  }

  handleTimeFrameFromInput(event: Event) {
    let val = ((event as Event).target as HTMLInputElement).value;
    this.fromSub$.next(val);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'from', value: val});
    // #
  }

  handleTimeFrameToInput(event: Event) {
    let val = ((event as Event).target as HTMLInputElement).value;
    this.toSub$.next(val);

    // #
    // use service to update filter in the store
    this.filterService.handleInput({type: 'to', value: val});
    // #
  }

  constructor(
    private store: Store,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    // #
    this.filter$ = this.store.select<any>('filter');
    this.filter$.subscribe(filter => {
      console.log(filter);
      this.filter = filter
    });
    // #

    let observableObj: ObservableFilter = {
      name$: this.nameObsv$,
      ac$: this.acObsv$,
      wb$: this.wbObsv$,
      display$: this.displayObsv$,
      date$: this.dateObsv$,
      from$: this.fromObsv$,
      to$: this.toObsv$,
    };
    this.filterInitEvent.emit(observableObj);

    this.nameSub$.next(''); // Send empty string as the first filtering string to be used.
    this.acSub$.next(false); // Mutatis mutandis.
    this.wbSub$.next(false);      // ||
    this.displaySub$.next(false); // ||
    this.dateSub$.next('');       // ||
    this.fromSub$.next('');       // ||
    this.toSub$.next('');         // ||
  }
}
