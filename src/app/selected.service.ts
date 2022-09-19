import { Injectable } from '@angular/core';

import { ActionHandlerService } from './action-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {

  constructor(
    private actionHandler: ActionHandlerService,
  ) { }

  reset() {
    this.actionHandler.resetSelected();
  }

  updateSelected(val: number[]) {
    this.actionHandler.setSelected(val);
  }
}
