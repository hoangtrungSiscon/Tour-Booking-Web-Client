import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceDetailComponent } from './invoice-detail.component';
import { AuthService } from '../../shared/services/auth.service';  // Adjust path as necessary
import { of } from 'rxjs';

class MockAuthService {
  // Mock methods if necessary
  someMethod() {
    return of('mocked data');
  }
}

describe('InvoiceDetailComponent', () => {
  let component: InvoiceDetailComponent;
  let fixture: ComponentFixture<InvoiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceDetailComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
      ]
    });
    fixture = TestBed.createComponent(InvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
