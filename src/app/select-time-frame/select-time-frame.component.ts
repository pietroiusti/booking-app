import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-time-frame',
  templateUrl: './select-time-frame.component.html',
  styleUrls: ['./select-time-frame.component.css']
})
export class SelectTimeFrameComponent implements OnInit {
  selectedDate: string | undefined;
  selectedTimeStart: string | undefined;
  selectedTimeEnd: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  handleInput() {
    console.log('selectedDate: ' + this.selectedDate);
    console.log('selectedTimeStart: ' + this.selectedTimeStart);
    console.log('selectedTimeEnd: ' + this.selectedTimeEnd);

    let UnixTimestampStartString = this.selectedDate + 'T' + this.selectedTimeStart + ':00' + '.000+02:00';
    let UnixTimestampEndString = this.selectedDate + 'T' + this.selectedTimeEnd + ':00' + '.000+02:00';
    console.log('UnixTimestampStart: ' + Date.parse(UnixTimestampStartString));
    console.log('UnixTimestampEnd: ' + Date.parse(UnixTimestampEndString));
  }

}
