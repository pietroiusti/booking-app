import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Room } from '../models/room';
import { Store } from '../store';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent implements OnInit {

  @Input() room: Room | null = null;

  @Input() selected: number[] = [];

  test(ev: Event) {
    console.log(ev);
    ev.preventDefault()
    ev.stopPropagation();
    // debugger;
    console.log(this.store.value)
  }

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    
  }

  //handleCheckBoxChange();

}
