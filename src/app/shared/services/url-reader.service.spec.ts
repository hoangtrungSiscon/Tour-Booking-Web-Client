import { TestBed } from '@angular/core/testing';

import { UrlReaderService } from './url-reader.service';

describe('UrlReaderService', () => {
  let service: UrlReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
