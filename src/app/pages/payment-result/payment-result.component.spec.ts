import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentResultComponent } from './payment-result.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

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
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
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
