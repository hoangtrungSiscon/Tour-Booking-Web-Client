import { TestBed } from '@angular/core/testing';

import { RssFeedService } from './rss.service';

describe('RssFeedService', () => {
  let service: RssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
