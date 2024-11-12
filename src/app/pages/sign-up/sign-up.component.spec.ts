import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // if using reactive forms
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../../shared/services/auth.service';  // if you have a service to mock
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],      declarations: [SignUpComponent],
      providers: [
        // Mock any services used by SignUpComponent
        { provide: AuthService, useValue: { signUp: () => {} } },
      ],
    }).compileComponents();  // Make sure the component is compiled

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger change detection to update the component
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
