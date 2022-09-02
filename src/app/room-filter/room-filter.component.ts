import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent implements OnInit {
  sub$: Subject<string> = new Subject<string>()
  obvs$: Observable<string> =  this.sub$.asObservable();
  @Output() nameFilterInitEvent: EventEmitter<any> = new EventEmitter();

  handleNameInput(event: Event) {
    console.log('handleInputEvent()');
    let userInput = (((event as InputEvent).target) as HTMLInputElement).value;
    this.sub$.next(userInput);
  }

  constructor() { }

  ngOnInit(): void {
    this.nameFilterInitEvent.emit(this.obvs$); // pass observable to parent
    this.sub$.next(''); // send empty string as the first filtering string to be used
  }
}
