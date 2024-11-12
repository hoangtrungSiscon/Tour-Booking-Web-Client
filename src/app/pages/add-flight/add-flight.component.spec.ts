import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFlightComponent } from './add-flight.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import forms nếu component dùng form
import { HttpClientModule } from '@angular/common/http'; // Import HttpClient nếu cần
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule nếu dùng Router

describe('AddFlightComponent', () => {
  let component: AddFlightComponent;
  let fixture: ComponentFixture<AddFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlightComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [] // Thêm các dịch vụ nếu cần thiết
    });

    fixture = TestBed.createComponent(AddFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
