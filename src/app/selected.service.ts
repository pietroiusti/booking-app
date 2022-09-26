import { Injectable } from '@angular/core';

import { ActionHandlerService } from './action-handler.service';
import { StateService4Service } from './state-service4.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {

  constructor(
    private actionHandler: ActionHandlerService,
    private stateService4Service: StateService4Service,
  ) { }

  reset() {
    //this.actionHandler.resetSelected();
    this.stateService4Service.resetSelected();
  }

  updateSelected(val: number[]) {
    //this.actionHandler.setSelected(val);
    this.stateService4Service.setSelected(val);
  }
}
