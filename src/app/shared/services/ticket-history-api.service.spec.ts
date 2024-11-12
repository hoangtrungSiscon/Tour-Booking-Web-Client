import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TicketHistoryApiService } from './ticket-history-api.service';

describe('TicketHistoryApiService', () => {
  let service: TicketHistoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]  // Import HttpClientTestingModule to mock HTTP requests
    });
    service = TestBed.inject(TicketHistoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
