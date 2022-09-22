import { Component, Input, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
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

  @Output() checkboxEvent: EventEmitter<any> = new EventEmitter();

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

  stopProp(event: Event) {
    event.stopPropagation();
  }

  handleCheckBoxChange(obj: MatCheckboxChange, roomId: number|null){
    this.checkboxEvent.emit({roomId, checked: obj.checked});
  };

}
