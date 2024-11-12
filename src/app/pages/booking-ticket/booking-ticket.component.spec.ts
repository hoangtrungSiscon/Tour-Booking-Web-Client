import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingTicketComponent } from './booking-ticket.component';
import { MatButtonModule } from '@angular/material/button'; // Thêm module của Angular Material nếu cần
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Nếu component sử dụng form
import { HttpClientModule } from '@angular/common/http'; // Nếu component sử dụng HTTP
import { RouterTestingModule } from '@angular/router/testing'; // Nếu sử dụng Router trong component

describe('BookingTicketComponent', () => {
  let component: BookingTicketComponent;
  let fixture: ComponentFixture<BookingTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingTicketComponent],
      imports: [
        MatButtonModule, // Thêm các module cần thiết
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule  // Nếu cần RouterModule
      ],
      providers: []  // Nếu có các dịch vụ cần phải cung cấp
    });
    fixture = TestBed.createComponent(BookingTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
