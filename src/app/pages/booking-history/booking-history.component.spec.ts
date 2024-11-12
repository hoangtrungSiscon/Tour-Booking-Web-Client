import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingHistoryComponent } from './booking-history.component';
import { TicketHistoryApiService } from '../../shared/services/ticket-history-api.service'; // Ensure correct import path
import { of } from 'rxjs';

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
