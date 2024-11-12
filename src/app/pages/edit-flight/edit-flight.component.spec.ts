import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlightComponent } from './edit-flight.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditFlightComponent', () => {
  let component: EditFlightComponent;
  let fixture: ComponentFixture<EditFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFlightComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(EditFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
