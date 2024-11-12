import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartsBSNComponent } from './line-charts-bsn.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LineChartsBSNComponent', () => {
  let component: LineChartsBSNComponent;
  let fixture: ComponentFixture<LineChartsBSNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartsBSNComponent],
      imports: [
        ReactiveFormsModule, // Import các module cần thiết
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(LineChartsBSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
