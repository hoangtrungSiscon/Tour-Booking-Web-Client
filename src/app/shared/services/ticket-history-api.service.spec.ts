import { TestBed } from '@angular/core/testing';

import { TicketHistoryApiService } from './ticket-history-api.service';

describe('TicketHistoryApiService', () => {
  let service: TicketHistoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketHistoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
