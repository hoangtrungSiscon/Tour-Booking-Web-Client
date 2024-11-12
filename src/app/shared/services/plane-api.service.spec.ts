import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import for HTTP requests
import { PlaneApiService } from './plane-api.service';  // Ensure the correct service is imported

describe('PlaneApiService', () => {
  let service: PlaneApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Mock HTTP client for testing API requests
    });
    service = TestBed.inject(PlaneApiService);  // Correctly inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
