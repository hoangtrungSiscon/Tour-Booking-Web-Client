import { TestBed } from '@angular/core/testing';

import { NewestFlightService } from './newest-flight.service';

describe('NewestFlightService', () => {
  let service: NewestFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewestFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
