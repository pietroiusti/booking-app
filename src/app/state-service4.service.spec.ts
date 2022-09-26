import { TestBed } from '@angular/core/testing';

import { StateService4Service } from './state-service4.service';

describe('StateService4Service', () => {
  let service: StateService4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
