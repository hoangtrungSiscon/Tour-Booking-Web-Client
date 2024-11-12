import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestManagementComponent } from './guest-management.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('GuestManagementComponent', () => {
  let component: GuestManagementComponent;
  let fixture: ComponentFixture<GuestManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestManagementComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(GuestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
