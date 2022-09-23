import { Component, Input, OnInit, ChangeDetectionStrategy, EventEmitter, Output, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Room } from '../models/room';
import { Store } from '../store';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent implements OnInit, OnDestroy, OnChanges {

  _room: Room | null = null;

  @Input() set room(value: Room){
    this._room = value;
    console.log('set room', this._room.id);
  }

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

  ngOnDestroy(): void {
    console.log('ngOnDestroy', this._room?.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges', this._room?.id);
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

  handleCheckBoxChange(obj: MatCheckboxChange, roomId: number|null) {
    this.checkboxEvent.emit({roomId, checked: obj.checked});
  };

  handleModifyButtonClick(e: Event) {
    e.stopPropagation()
    console.log(`hello world, ${this.room?.id}`);
  }

}
