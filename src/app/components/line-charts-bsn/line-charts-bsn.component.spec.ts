import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartsBSNComponent } from './line-charts-bsn.component';

describe('LineChartsBSNComponent', () => {
  let component: LineChartsBSNComponent;
  let fixture: ComponentFixture<LineChartsBSNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartsBSNComponent]
    });
    fixture = TestBed.createComponent(LineChartsBSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
