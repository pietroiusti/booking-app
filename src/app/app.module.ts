import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntitiesComponent } from './entities/entities.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    ProfileComponent,
    RoomsComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
