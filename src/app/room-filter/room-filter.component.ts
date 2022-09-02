import { HtmlParser } from '@angular/compiler';
import { Component, OnInit, Directive, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { from, fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent implements OnInit, AfterViewInit {
  nameControl = new FormControl('');

  @ViewChild('nameFilter') nameFilter!: ElementRef;

  // DIFFERENT WAYS OF IMPLEMENTING FILTERING BY NAME:

  // FILTERING 1:
  // Use rxjs' fromEvent to get typeahead$.
  // Subscribe to typeahead$ and
  // pass values emitted by typeahead$ to parent (rooms component), which
  // uses the string value to filter the rooms array displayed in its template
  @Output() nameFilterEvent: EventEmitter<any> = new EventEmitter();

  // FILTERING 2:
  // Use rxjs' fromEvent to get typeahead$.
  // Pass typeahead observalbe to parent (rooms component), which  combines
  // rooms$ and typeahead$ in order to listen to both of them, and reactively change
  // the rooms array displayed in the template as soon as new value is emitted
  // by either rooms$ or typeahead$.
  // Unlike FILTERING 1, FILTERING 2 allows for room cards in the view being
  // modified/added/removed upon store modification also after they have been filtered.
  @Output() nameFilterEvent2: EventEmitter<any> = new EventEmitter();

  // FILTERING 3:
  // use (input) in the template to pass a value to rooms component
  // Somehow achieve the same result that we would achieve with fromEvent()
  @Output() nameFilterEvent3: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {
    console.log(this.nameFilter);
    console.log(this.nameFilter.nativeElement);

    // create observable emitting user text input value as they type
    const typeahead$ = fromEvent(this.nameFilter.nativeElement, 'input').pipe(
      //tap(x => console.log('hello: ' + x)),
      map(e => ((e as InputEvent).target as HTMLInputElement).value),
      //filter(text => text.length > 2),
      //debounceTime(10),
      distinctUntilChanged()
    );

    // filtering 2
    // send typeahead observable to parent
    this.nameFilterEvent2.emit(typeahead$);

    //filtering 1
    typeahead$.subscribe( data => {
      console.log('typeahead: ' + data);
      this.nameFilterEvent.emit(data);
    });
  }

  //filtering 3
  handleInputEvent3(event: Event) {
    console.log('handleInputEvent3()');
    console.log(event);
  }

  constructor() { }

  ngOnInit(): void {
    this.nameFilterEvent2.emit(of('')); // <======= Send empty string as a the the first
                                        // filtering string to be used.
                                        // Without this the room cards are not rendered when
                                        // accessing the rooms component.
  }
}
