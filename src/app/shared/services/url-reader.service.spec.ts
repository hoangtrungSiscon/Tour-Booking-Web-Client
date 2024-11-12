import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlReaderService } from './url-reader.service';

describe('UrlReaderService', () => {
  let service: UrlReaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UrlReaderService],
    });
    service = TestBed.inject(UrlReaderService);
    httpMock = TestBed.inject(HttpTestingController);  // Mock HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add additional tests if needed to check specific HTTP requests

  afterEach(() => {
    httpMock.verify();  // Ensure no outstanding HTTP requests
  });
});
