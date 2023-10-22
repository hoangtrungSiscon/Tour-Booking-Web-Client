import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestManagementComponent } from './guest-management.component';

describe('GuestManagementComponent', () => {
  let component: GuestManagementComponent;
  let fixture: ComponentFixture<GuestManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestManagementComponent]
    });
    fixture = TestBed.createComponent(GuestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
