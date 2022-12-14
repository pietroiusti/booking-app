// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';

// services
//import { InMemoryDataService } from './in-memory-data.service';

import { Store } from './store';
import { Store4 } from './store4';

// components
import { AppComponent } from './app.component';
import { EntitiesComponent } from './entities/entities.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomCurrentBookingsComponent } from './room-current-bookings/room-current-bookings.component';
import { SelectTimeFrameComponent } from './select-time-frame/select-time-frame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RoomFilterComponent } from './room-filter/room-filter.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteRoomDialogComponent } from './delete-room-dialog/delete-room-dialog.component';
import { CreateModifyRoomDialogComponent } from './create-modify-room-dialog/create-modify-room-dialog.component';
import { RoomCardComponent } from './room-card/room-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    ProfileComponent,
    RoomsComponent,
    RoomDetailComponent,
    RoomCurrentBookingsComponent,
    SelectTimeFrameComponent,
    RoomFilterComponent,
    DeleteRoomDialogComponent,
    CreateModifyRoomDialogComponent,
    RoomCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //),
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    Store,
    Store4,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
