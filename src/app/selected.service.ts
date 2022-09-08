import { Injectable } from '@angular/core';

import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {

  constructor(
    private store: Store
  ) { }

  reset() {
    this.store.set('selected', []);
  }

  updateSelected(val: number[]) {
    this.store.set('selected', val);
  }
}
