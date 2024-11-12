import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnChartsComponent } from './column-charts.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ColumnChartsComponent', () => {
  let component: ColumnChartsComponent;
  let fixture: ComponentFixture<ColumnChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnChartsComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(ColumnChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
