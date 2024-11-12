import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VnpayService } from './vnpay.service';

describe('VnpayService', () => {
  let service: VnpayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // To mock HTTP calls
      providers: [VnpayService]           // Provide the VnpayService
    });

    service = TestBed.inject(VnpayService);
    httpMock = TestBed.inject(HttpTestingController);  // Mock HTTP controller
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add tests for specific behavior of the service if needed
});
