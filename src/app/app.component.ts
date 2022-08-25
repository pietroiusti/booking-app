import { Component } from '@angular/core';
import { Store } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Booking App';

  todos$ = this.store.select<any[]>('todos'); // no callback. Reactive!

  constructor(
    private store: Store,
  ) {
    console.log(this.store);
    this.store.set('todos', [{id:1, name: 'eat'},
                             {id:2, name: 'drink'},
                             {id:3, name: 'sleep'}])
  }
}