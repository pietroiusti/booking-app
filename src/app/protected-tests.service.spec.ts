import { TestBed } from '@angular/core/testing';

import { ProtectedTestsService } from './protected-tests.service';

describe('ProtectedTestsService', () => {
  let service: ProtectedTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectedTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
