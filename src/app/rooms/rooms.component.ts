import { Component, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';

import { Observable, Subscription } from 'rxjs';

import { Room } from '../models/room';

import { FilterService } from '../filter.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { SelectedService } from '../selected.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnDestroy, AfterViewInit, OnInit {
  ngOnInit(): void { }

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
  ) { }

  ngAfterViewInit(): void {
    this.filteredRoomsSubscription = this.filterService.getFilteredRoomsObsv2()
      .subscribe(filtered => {
        console.log('filteredRoomsObsv observer: GOT FILTERED ROOMS');
        this.filteredRooms = filtered;
        this.cd.detectChanges();
      });

    this.selectedSubscription = this.selected$.subscribe(selected => this.selected = selected);
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
