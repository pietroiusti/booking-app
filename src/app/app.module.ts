// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// services
import { InMemoryDataService } from './in-memory-data.service';

import { Store } from './store';

// components
import { AppComponent } from './app.component';
import { EntitiesComponent } from './entities/entities.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomCurrentBookingsComponent } from './room-current-bookings/room-current-bookings.component';
import { SelectTimeFrameComponent } from './select-time-frame/select-time-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    ProfileComponent,
    RoomsComponent,
    RoomDetailComponent,
    RoomCurrentBookingsComponent,
    SelectTimeFrameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [
    Store,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
