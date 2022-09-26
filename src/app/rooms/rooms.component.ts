import { Component, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Store } from '../store';

import { Observable, Subscription } from 'rxjs';

import { Room } from '../models/room';

import { FilterService } from '../filter.service';

import { SelectedService } from '../selected.service';
import { Filter } from '../models/filter';

import { RoomService } from '../room.service';

import { MatDialog } from '@angular/material/dialog';
import { CreateModifyRoomDialogComponent } from '../create-modify-room-dialog/create-modify-room-dialog.component';
import { ProtectedTestsService } from '../protected-tests.service';

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
    private dialog: MatDialog,
    private protectedTestsService: ProtectedTestsService,
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
  
    debugger;
    this.protectedTestsService.log();
    const filter3$: Observable<Filter> = this.protectedTestsService.filter3$;
    filter3$.subscribe(v => console.log(v));

    const selected3$: Observable<number[]> = this.protectedTestsService.selected3$;
    selected3$.subscribe(v => console.log(v));
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

  handleCreateRoomClick3() {
    const dRef = this.dialog.open(CreateModifyRoomDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dRef.afterClosed().subscribe(v => {
      console.log('closed');
    })

  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

  handleCheckBoxEvent(obj: {roomId: number, checked: boolean}) {
    if (!this.selected) {
      console.log('???')
      return;
    }

    //TODO: move this logic into the selected service?
    let selected;
    selected = this.selected.map(x => x); // shallow copy

    if (obj.checked === true) {
      if (!selected.includes(obj.roomId))
        selected.push(obj.roomId);
    } else if (obj.checked === false) {
      if (selected.includes(obj.roomId))
        selected = selected.filter(id => id !== obj.roomId);
    }
    this.selectedService.updateSelected(selected);

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

  modifyRoom(event: Event, roomId: number) {
    event.stopPropagation();
    console.log(roomId);
  }

  logStore() {
    console.log(this.store);
  }

  deleteSelected() {
    this.roomService.deleteRooms(this.selected);
  }

  goBack(): void {
    this.location.back();
  }
}
