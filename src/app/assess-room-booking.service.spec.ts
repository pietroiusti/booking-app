import { TestBed } from '@angular/core/testing';

import { AssessRoomBookingService } from './assess-room-booking.service';

describe('AssessRoomBookingService', () => {
  let service: AssessRoomBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessRoomBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
