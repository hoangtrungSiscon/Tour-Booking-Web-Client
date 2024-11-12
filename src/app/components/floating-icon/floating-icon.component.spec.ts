import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingIconComponent } from './floating-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('FloatingIconComponent', () => {
  let component: FloatingIconComponent;
  let fixture: ComponentFixture<FloatingIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatingIconComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(FloatingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
