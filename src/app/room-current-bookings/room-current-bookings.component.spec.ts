import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCurrentBookingsComponent } from './room-current-bookings.component';

describe('RoomCurrentBookingsComponent', () => {
  let component: RoomCurrentBookingsComponent;
  let fixture: ComponentFixture<RoomCurrentBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCurrentBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCurrentBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
