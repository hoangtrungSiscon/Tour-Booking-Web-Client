import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetCountryService } from './get-country.service';

describe('GetCountryService', () => {
  let service: GetCountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HTTP requests
      providers: [GetCountryService]
    });
    service = TestBed.inject(GetCountryService);
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController to mock HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Additional tests for HTTP behavior
});
