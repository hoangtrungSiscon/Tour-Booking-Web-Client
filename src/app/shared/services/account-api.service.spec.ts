import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule for mocking HTTP requests
import { AccountApiService } from './account-api.service';  // Import the service to be tested

describe('AccountApiService', () => {
  let service: AccountApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Mock HTTP requests with HttpClientTestingModule
    });
    service = TestBed.inject(AccountApiService);  // Inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Check that the service is created successfully
  });
});
