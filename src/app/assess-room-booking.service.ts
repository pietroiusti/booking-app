import { Injectable } from '@angular/core';

import { Booking } from './booking';
import { RoomBookingAssessment } from './room-booking-assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessRoomBookingService {

  constructor() { }

  assess(booking: Booking): RoomBookingAssessment {
    console.log('Assessing:')
    console.log(booking);

    //todo: logic

    let result: 'accepted' | 'rejected';
    //result = 'rejected';
    //let msg = 'Are you sure no one has already booked the room at that time?';

    result = 'accepted';
    let msg = 'Yay!!!';

    return {result, msg};
  }
}
