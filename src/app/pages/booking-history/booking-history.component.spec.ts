import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingHistoryComponent } from './booking-history.component';
import { TicketHistoryApiService } from '../../shared/services/ticket-history-api.service'; // Ensure correct import path
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

class MockTicketHistoryApiService {
  getTicketHistory() {
    return of([{ id: 1, ticketName: 'Test Ticket' }]);  // Mock dữ liệu mẫu
  }
}

describe('BookingHistoryComponent', () => {
  let component: BookingHistoryComponent;
  let fixture: ComponentFixture<BookingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingHistoryComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TicketHistoryApiService, useClass: MockTicketHistoryApiService }
      ]
    });
    fixture = TestBed.createComponent(BookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  
});
