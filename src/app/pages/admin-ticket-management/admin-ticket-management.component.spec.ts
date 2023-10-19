import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketManagementComponent } from './admin-ticket-management.component';

describe('AdminTicketManagementComponent', () => {
  let component: AdminTicketManagementComponent;
  let fixture: ComponentFixture<AdminTicketManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTicketManagementComponent]
    });
    fixture = TestBed.createComponent(AdminTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
