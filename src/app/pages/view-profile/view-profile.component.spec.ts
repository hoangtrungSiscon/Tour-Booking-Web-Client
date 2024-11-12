import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProfileComponent } from './view-profile.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// Mock the ProfileService
class MockProfileService {
  getUserProfile() {
    return of({ name: 'John Doe', email: 'john.doe@example.com' });
  }
}

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {  useClass: MockProfileService }
      ]
    });
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile', () => {
    expect(component.form).toEqual({ name: 'minh', email: 'plkminh.c918@gmail.com' });
  });
});
