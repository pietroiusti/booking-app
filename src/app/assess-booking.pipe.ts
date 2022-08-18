// Not using this at the moment. It was just a test.
// Delete?

import { Pipe, PipeTransform } from '@angular/core';

import { TimeFrameInput } from './time-frame-input';

@Pipe({
  name: 'assessBooking'
})
export class AssessBookingPipe implements PipeTransform {

  transform(value: TimeFrameInput, ...args: any[]) {

    console.log(value);
    console.log(args);

    //todo: check booking can be made...

    return 'Booking seems okay!';
  }

}
