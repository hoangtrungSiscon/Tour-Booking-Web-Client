import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule for mocking HTTP requests
import { NewestFlightService } from './newest-flight.service';

describe('NewestFlightService', () => {
  let service: NewestFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HttpClientTestingModule if service uses HttpClient
    });
    service = TestBed.inject(NewestFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Check that the service is created successfully
  });
});
