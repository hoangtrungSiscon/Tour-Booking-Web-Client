import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingTicketDetailComponent } from './booking-ticket-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookingTicketDetailComponent', () => {
  let component: BookingTicketDetailComponent;
  let fixture: ComponentFixture<BookingTicketDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingTicketDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule // Import nếu component sử dụng Router
      ],
      providers: [
        // Nếu cần mock các dịch vụ, thêm ở đây
      ]
    });
    fixture = TestBed.createComponent(BookingTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
