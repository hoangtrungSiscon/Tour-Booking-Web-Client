import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { InvoiceService } from './invoice.service'; // Import the service to be tested

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock the HTTP requests with HttpClientTestingModule
    });
    service = TestBed.inject(InvoiceService);  // Inject the service to test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Assert that the service is successfully created
  });
});
