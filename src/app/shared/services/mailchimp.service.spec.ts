import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Add HttpClientTestingModule
import { MailchimpService } from './mailchimp.service';

describe('MailchimpService', () => {
  let service: MailchimpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]  // Include HttpClientTestingModule
    });
    service = TestBed.inject(MailchimpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
