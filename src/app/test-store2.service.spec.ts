import { TestBed } from '@angular/core/testing';

import { TestStore2Service } from './test-store2.service';

describe('TestStore2Service', () => {
  let service: TestStore2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestStore2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
