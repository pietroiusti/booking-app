import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';

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

  @Output() filterInitEvent: EventEmitter<any> = new EventEmitter();

  handleNameInput(event: Event) {
    console.log('handleInputEvent()');
    let userInput = (((event as InputEvent).target) as HTMLInputElement).value;
    this.nameSub$.next(userInput);
  }

  handleAcInput(event: Event) {
    //console.log(event);
    //console.log(((event as Event).target as HTMLInputElement).checked);
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.acSub$.next(isChecked);
  }

  handleWbInput(event: Event) {
    //console.log(event);
    //console.log(((event as Event).target as HTMLInputElement).checked);
    let isChecked = ((event as Event).target as HTMLInputElement).checked;
    this.wbSub$.next(isChecked);
  }

  constructor() { }

  ngOnInit(): void {
    //this.filterInitEvent.emit(this.nameObvs$); // pass observable to parent

    //let observables = [this.nameObvs$, this.AcObvs$];
    //this.filterInitEvent.emit(observables);

    interface ObservableFilter {
      name$: Observable<string>;
      ac$: Observable<boolean>;
      wb$: Observable<boolean>;
    }

    let observableObj: ObservableFilter = {
      name$: this.nameObvs$,
      ac$: this.acObvs$,
      wb$: this.wbObvs$,
    };
    this.filterInitEvent.emit(observableObj);

    this.nameSub$.next(''); // send empty string as the first filtering string to be used
    this.acSub$.next(false); // mutatis mutandis
    this.wbSub$.next(false); // ||
  }
}
