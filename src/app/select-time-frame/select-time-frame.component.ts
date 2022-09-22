import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';

// types
import { TimeFrameInput } from '../models/time-frame-input';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTimeFrameComponent implements OnInit {

  selectedDateControl = new FormControl('');
  selectedTimeStartControl = new FormControl('');
  selectedTimeEndControl = new FormControl('');

  @Output() newBookingEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void { }

  handleInput() {
    console.log('handleInput()');
    if (this.selectedDateControl.value && this.selectedTimeStartControl.value
                                       && this.selectedTimeEndControl.value) {
      let input: TimeFrameInput = {
        selectedDate: this.selectedDateControl.value,
        selectedTimeStart: this.selectedTimeStartControl.value,
        selectedTimeEnd: this.selectedTimeEndControl.value,
      };

      this.newBookingEvent.emit(input);

      this.selectedDateControl.setValue('');
      this.selectedTimeStartControl.setValue('');
      this.selectedTimeEndControl.setValue('');
    }
  }
}
