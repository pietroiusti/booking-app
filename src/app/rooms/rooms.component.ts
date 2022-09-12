import { Component, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';

import { Observable, Subscription } from 'rxjs';

import { Room } from '../models/room';

import { FilterService } from '../filter.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SelectedService } from '../selected.service';
import { Filter } from '../models/filter';

import { RoomService } from '../room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnDestroy, AfterViewInit, OnInit {
  ngOnInit(): void { }

  filter: Filter | null = null;
  filterSubscription: Subscription | null = null;

  filteredRooms: Room[] = [];
  filteredRoomsSubscription: Subscription | null = null;

  selected: number[] = [];
  selected$: Observable<number[]> = this.store.select<number[]>('selected');
  selectedSubscription: Subscription | null = null;

  constructor(
    private location: Location,
    private store: Store,
    private cd: ChangeDetectorRef,
    private filterService: FilterService,
    private selectedService: SelectedService,
    private roomService: RoomService,
    private _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    console.log('this.ngAfterViewInit')
    this.filteredRoomsSubscription = this.filterService.getFilteredRoomsObsv2()
      .subscribe(filtered => {
        console.log('filteredRoomsObsv observer: GOT FILTERED ROOMS');
        console.log(filtered);
        this.filteredRooms = filtered;
        this.cd.detectChanges();
      });

    this.selectedSubscription = this.selected$.subscribe(selected => this.selected = selected);

    this.filterSubscription = this.store.select<Filter>('filter').subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    if (this.filteredRoomsSubscription) {
      console.log('unsub1');
      this.filteredRoomsSubscription.unsubscribe();
    }
    if (this.selectedSubscription) {
      console.log('unsub2');
      this.selectedSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }

    this.selectedService.reset();
  }

  handleCreateRoomClick() {
    // TODO
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

  handleCheckBoxChange(obj: MatCheckboxChange, roomId: number) {
    if (this.selected) {
      //TODO: move this stuff into the selected service
      let selected;
      selected = this.selected.map(x => x); // shallow copy

      if (obj.checked === true) {
        if (!selected.includes(roomId)) selected.push(roomId);
      } else if (obj.checked === false) {
        if (selected.includes(roomId)) selected = selected.filter(id => id !== roomId);
      }
      this.selectedService.updateSelected(selected);

    } else {
      console.log('???');
    }
  }

  multipleBook3(): void {
    let selectedRooms: Room[] = this.filteredRooms.filter(r => this.selected.includes(r.id));

    this.selectedService.reset();

    if (!this.filter)
      return;

    let forkJoined = this.roomService.bookMultiple3(selectedRooms, this.filter['date'], this.filter['from'], this.filter['to']);

    forkJoined.subscribe();

    this.filterService.reset();
  }

  multipleBook2(): void {
    let selectedRooms: Room[] = this.filteredRooms.filter(r => this.selected.includes(r.id));

    this.selectedService.reset();

    if (this.filter) {
      let forkJoined = this.roomService.bookMultiple2(selectedRooms, this.filter['date'], this.filter['from'], this.filter['to']);
      forkJoined.subscribe(v => {
        if (v.reduce((a, o) => o.result === 'All good' ? a : false, true)) {// if each req result === 'all good'
          console.log('All good! :)');
          this._snackBar.open('All good! :)');
        } else {
          console.log('Something went w rong :(');
          console.log(v);
          this._snackBar.open('Something went w rong :(');
        }
      });
    }

    this.filterService.reset();
  }

  multipleBook(): void {
    let selectedRooms: Room[] = this.filteredRooms.filter(r => this.selected.includes(r.id));

    this.selectedService.reset();

    if (this.filter)
      this.roomService.bookMultiple(selectedRooms, this.filter['date'], this.filter['from'], this.filter['to']);

    this.filterService.reset();

  }

  modifyRoom(event: Event, roomId: number) {
    event.stopPropagation();
    console.log(roomId);
  }

  logStore() {
    console.log(this.store);
  }

  goBack(): void {
    this.location.back();
  }
}
