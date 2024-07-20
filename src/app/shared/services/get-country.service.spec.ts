import { TestBed } from '@angular/core/testing';

import { GetCountryService } from './get-country.service';

describe('GetCountryService', () => {
  let service: GetCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
