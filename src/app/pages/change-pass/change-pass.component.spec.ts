import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePassComponent } from './change-pass.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangePassComponent', () => {
  let component: ChangePassComponent;
  let fixture: ComponentFixture<ChangePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassComponent],
      imports: [
        ReactiveFormsModule, // Thêm nếu component sử dụng Reactive Forms
        FormsModule,
        HttpClientModule, // Thêm nếu sử dụng HttpClient
        RouterTestingModule, // Thêm nếu có router liên kết
      ],
      providers: [
        // Thêm mock dịch vụ nếu cần
      ]
    });
    fixture = TestBed.createComponent(ChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
