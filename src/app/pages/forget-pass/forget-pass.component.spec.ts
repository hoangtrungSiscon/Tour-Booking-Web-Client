import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPassComponent } from './forget-pass.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('ForgetPassComponent', () => {
  let component: ForgetPassComponent;
  let fixture: ComponentFixture<ForgetPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPassComponent],
      imports: [HttpClientTestingModule], // Provide HttpClientTestingModule to mock HTTP requests
    });
    fixture = TestBed.createComponent(ForgetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
