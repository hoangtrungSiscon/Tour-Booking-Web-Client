import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicesComponent } from './invoices.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Mock HTTP requests
import { MatTableModule } from '@angular/material/table';  // Import Material modules if needed
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // For form-related components, if used
import { RouterTestingModule } from '@angular/router/testing';  // Mock routing if required

describe('InvoicesComponent', () => {
  let component: InvoicesComponent;
  let fixture: ComponentFixture<InvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesComponent],
      imports: [
        HttpClientTestingModule,   // Use HttpClientTestingModule to mock HTTP calls
        MatTableModule,            // Import Material Table module if the component uses it
        FormsModule,               // For form handling if necessary
        ReactiveFormsModule,       // If reactive forms are used
        RouterTestingModule        // If there are routing dependencies
      ]
    });

    fixture = TestBed.createComponent(InvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger change detection to ensure the component is initialized
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifies that the component is created successfully
  });
});
