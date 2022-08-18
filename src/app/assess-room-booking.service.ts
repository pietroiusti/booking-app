import { Injectable } from '@angular/core';

import { Booking } from './booking';
import { RoomBookingAssessment } from './room-booking-assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessRoomBookingService {

  constructor() { }

  endBeforeStart (booking: Booking): boolean {
    console.log('startBeforeEnd');
    if ( booking.end < booking.start )
      return true;
    else 
     return false;
  }  

  // check whether two time frames overlap  
  overlap(): boolean {
    //return true;
    return false;
  }

  assess(roomId: string | undefined, booking: Booking): RoomBookingAssessment {
    console.log('Assessing:')

    if (this.endBeforeStart(booking))
      return { result: false, msg: "End time cannot be before start time... Are you awake?" };

    if (this.overlap()) {
      console.log('foobarbaz');
      return { result: false, msg: "Check current bookings again..." };
    } 

    console.log('Room: ' + roomId);
    console.log("booking:");
    console.log(booking);

    //todo: logic

    let result: boolean;
    //result = 'rejected';
    //let msg = 'Are you sure no one has already booked the room at that time?';

    result = true;
    let msg = 'Yay!!!';

    return {result, msg};
  }
}
