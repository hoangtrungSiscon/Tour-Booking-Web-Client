import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import this module
import { TicketApiService } from './ticket-api.service';

describe('TicketApiService', () => {
  let service: TicketApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Provide HttpClientTestingModule for HTTP requests
    });
    service = TestBed.inject(TicketApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
