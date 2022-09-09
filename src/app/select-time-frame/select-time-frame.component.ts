import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private _snackBar: MatSnackBar
  ) { }

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
    }

    //openSnackBar(message.value, action.value)
    //this._snackBar.open('Book successful!', 'Okay');
  }
}
