import { TestBed } from '@angular/core/testing';

import { GetPlaneNameService } from './get-plane-name.service';

describe('GetPlaneNameService', () => {
  let service: GetPlaneNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPlaneNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
