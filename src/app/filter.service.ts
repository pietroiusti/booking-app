import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from './store';

import { Filter } from './models/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter: Filter | null = null;
  filter$: Observable<Filter> | null = null;

  constructor(
    private store: Store
    ) {
      console.log('filterService constructor()');

      this.filter$ = this.store.select<Filter>('filter');
      this.filter$.subscribe(filter => {
        console.log('filterService: ');
        this.filter = filter;
        console.log(this.filter);
      });

    }

    handleInput(options: {type: string, value: any}) {
      console.log('filter.service: ');
      console.log(options);

      let filter = Object.assign({}, this.filter); // shallow copy of filter

      switch (options.type) {
        case 'name':
          console.log('filter service: trying to update name in store with value ' + options.value);
          filter.name = options.value;
          this.store.set('filter', filter);
          break;
        case 'ac':
          console.log('filter service: trying to update ac in store with value ' + options.value);
          filter.ac = options.value;
          this.store.set('filter', filter);
          break;
        case 'wb':
          console.log('filter service: trying to update wb in store with value ' + options.value);
          filter.wb = options.value;
          this.store.set('filter', filter);
          break;
        case 'display':
          console.log('filter service: trying to update display in store with value ' + options.value);
          filter.display = options.value;
          this.store.set('filter', filter);
          break;
        case 'date':
          console.log('filter service: trying to update date in store with value ' + options.value);
          filter.date = options.value;
          this.store.set('filter', filter);
          break;
        case 'from':
          console.log('filter service: trying to update from in store with value ' + options.value);
          filter.from = options.value;
          this.store.set('filter', filter);
          break;
        case 'to':
          console.log('filter service: trying to update to in store with value ' + options.value);
          filter.from = options.value;
          this.store.set('filter', filter);
          break;
        default:
          console.log('What should we do?');
      }

    }

}
