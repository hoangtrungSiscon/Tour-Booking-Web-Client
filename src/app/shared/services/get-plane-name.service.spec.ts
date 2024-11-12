import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { GetPlaneNameService } from './get-plane-name.service';
import { PlaneApiService } from './plane-api.service'; // Import any dependent service you might need to mock

// Mock PlaneApiService if it's a dependency of GetPlaneNameService
class MockPlaneApiService {
  // Mock any methods if needed
}

describe('GetPlaneNameService', () => {
  let service: GetPlaneNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Provide HttpClientTestingModule
      providers: [
        GetPlaneNameService,             // Ensure GetPlaneNameService is provided
        { provide: PlaneApiService, useClass: MockPlaneApiService },  // Provide a mocked version of PlaneApiService
      ],
    });
    service = TestBed.inject(GetPlaneNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
