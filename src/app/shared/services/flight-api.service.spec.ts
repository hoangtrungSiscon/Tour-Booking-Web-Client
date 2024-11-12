import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HTTP Client Testing Module
import { FlightApiService } from './flight-api.service';  // Import the service to be tested

describe('FlightApiService', () => {
  let service: FlightApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Mock the HTTP requests with HttpClientTestingModule
    });
    service = TestBed.inject(FlightApiService);  // Inject the service to test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Assert that the service is successfully created
  });
});
