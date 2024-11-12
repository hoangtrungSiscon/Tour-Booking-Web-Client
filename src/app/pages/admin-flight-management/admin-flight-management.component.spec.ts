import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFlightManagementComponent } from './admin-flight-management.component';
import { MatTableModule } from '@angular/material/table';  // Thêm các module cần thiết
import { MatPaginatorModule } from '@angular/material/paginator'; // Thêm module cho paginator
import { HttpClientModule } from '@angular/common/http'; // Thêm HttpClientModule nếu cần

describe('AdminFlightManagementComponent', () => {
  let component: AdminFlightManagementComponent;
  let fixture: ComponentFixture<AdminFlightManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFlightManagementComponent],
      imports: [MatTableModule, MatPaginatorModule, HttpClientModule ],  // Đảm bảo đã import các module cần thiết
      providers: [] // Các dịch vụ cần thiết, nếu có
    });
    fixture = TestBed.createComponent(AdminFlightManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
