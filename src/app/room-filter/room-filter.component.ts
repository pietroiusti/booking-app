import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { ObservableFilter } from '../models/observable-filter';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent implements OnInit {
  nameSub$: Subject<string> = new Subject<string>()
  nameObvs$: Observable<string> =  this.nameSub$.asObservable();

  // air cond
  acSub$: Subject<boolean> = new Subject<boolean>();
  acObvs$: Observable<boolean> =  this.acSub$.asObservable();
  // white board
  wbSub$: Subject<boolean> = new Subject<boolean>();
  wbObvs$: Observable<boolean> =  this.wbSub$.asObservable();
  // display
  displaySub$: Subject<boolean> = new Subject<boolean>();
  displayObsv$: Observable<boolean> = this.displaySub$.asObservable();

  @Output() filterInitEvent: EventEmitter<any> = new EventEmitter();

  handleNameInput(event: Event) {
    console.log('handleInputEvent()');
    let userInput = (((event as InputEvent).target) as HTMLInputElement).value;
    this.nameSub$.next(userInput);
  }

  handleAcInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.acSub$.next(isChecked);
  }

  handleWbInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.wbSub$.next(isChecked);
  }

  handleDisplayInput(event: Event) {
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.displaySub$.next(isChecked);
  }

  constructor() { }

  ngOnInit(): void {
    let observableObj: ObservableFilter = {
      name$: this.nameObvs$,
      ac$: this.acObvs$,
      wb$: this.wbObvs$,
      display$: this.displayObsv$,
    };
    this.filterInitEvent.emit(observableObj);

    this.nameSub$.next(''); // Send empty string as the first filtering string to be used.
    this.acSub$.next(false); // Mutatis mutandis.
    this.wbSub$.next(false); //      ||
    this.displaySub$.next(false); // ||
  }
}
