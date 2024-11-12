import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule

import { GuestApiService } from './guest-api.service';

describe('GuestApiService', () => {
  let service: GuestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Ensure HttpClientTestingModule is imported if HttpClient is used
      providers: [GuestApiService],        // Explicitly provide the service if it's not already provided in the module
    });
    service = TestBed.inject(GuestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
