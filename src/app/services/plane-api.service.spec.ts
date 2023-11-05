import { TestBed } from '@angular/core/testing';

import { PlaneApiService } from './plane-api.service';

describe('PlaneApiService', () => {
  let service: PlaneApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
