import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTicketManagementComponent } from './admin-ticket-management.component';
import { ChiTietVeService } from '../../shared/services/chiTietVe.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AdminTicketManagementComponent', () => {
  let component: AdminTicketManagementComponent;
  let fixture: ComponentFixture<AdminTicketManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTicketManagementComponent],
      imports: [
        HttpClientModule,       // Import nếu cần
        MatTableModule,         // Import Material Design module
        MatPaginatorModule      // Import Paginator nếu component sử dụng
      ],
      providers: [ChiTietVeService]
    });
    fixture = TestBed.createComponent(AdminTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
