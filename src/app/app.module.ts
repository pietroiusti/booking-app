import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntitiesComponent } from './entities/entities.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';

import { FormsModule } from '@angular/forms';
import { RoomCurrentBookingsComponent } from './room-current-bookings/room-current-bookings.component';
import { SelectTimeFrameComponent } from './select-time-frame/select-time-frame.component';
import { AssessBookingPipe } from './assess-booking.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    ProfileComponent,
    RoomsComponent,
    RoomDetailComponent,
    RoomCurrentBookingsComponent,
    SelectTimeFrameComponent,
    AssessBookingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
