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
    console.log('hello world');
  }

}
