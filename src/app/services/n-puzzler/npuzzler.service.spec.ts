import { TestBed } from '@angular/core/testing';

import { NPuzzlerService } from './npuzzler.service';

describe('NPuzzlerService', () => {
  let service: NPuzzlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NPuzzlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
