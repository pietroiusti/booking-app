import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntitiesComponent } from './entities/entities.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'entities', component: EntitiesComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
