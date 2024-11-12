import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentResultComponent } from './payment-result.component';
import { of } from 'rxjs';

// Mock service
class MockPaymentService {
  getPaymentResult() {
    return of({ success: true, transactionId: '12345' }); // Mocked data
  }
}

describe('PaymentResultComponent', () => {
  let component: PaymentResultComponent;
  let fixture: ComponentFixture<PaymentResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentResultComponent],
      providers: [
        {  useClass: MockPaymentService }
      ]
    });
    fixture = TestBed.createComponent(PaymentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display payment result', () => {
    expect(component.payStatus).toEqual('waiting');
  });
});
