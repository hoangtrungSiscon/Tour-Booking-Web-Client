import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightManagementComponent } from './admin-flight-management.component';

describe('AdminFlightManagementComponent', () => {
  let component: AdminFlightManagementComponent;
  let fixture: ComponentFixture<AdminFlightManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFlightManagementComponent]
    });
    fixture = TestBed.createComponent(AdminFlightManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
