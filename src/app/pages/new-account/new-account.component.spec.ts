import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAccountComponent } from './new-account.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // If the component uses forms
import { RouterTestingModule } from '@angular/router/testing';  // If routing is involved
import { HttpClientTestingModule } from '@angular/common/http/testing';  // If HTTP requests are used

// Mock any necessary services if needed
class MockSomeService {
  // Mock the methods used in the component
}

describe('NewAccountComponent', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAccountComponent],
      imports: [
        ReactiveFormsModule,        // Import ReactiveFormsModule if using reactive forms
        FormsModule,                // Import FormsModule if using template-driven forms
        RouterTestingModule,        // Use RouterTestingModule if the component uses routing
        HttpClientTestingModule,    // Mock HTTP calls if needed
      ],
      providers: [
        { useClass: MockSomeService }  // Mock any services
      ]
    });

    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger change detection to ensure the component is initialized
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verify the component creation
  });

  it('should have a form with initial values', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.controls['username'].value).toBe('');
    expect(component.registerForm.controls['email'].value).toBe('');
  });
});
