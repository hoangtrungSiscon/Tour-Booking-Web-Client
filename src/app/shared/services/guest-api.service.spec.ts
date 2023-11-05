import { TestBed } from '@angular/core/testing';

import { GuestApiService } from './guest-api.service';

describe('GuestApiService', () => {
  let service: GuestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
