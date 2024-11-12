import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticalComponent } from './statistical.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; // Nếu component sử dụng HTTP

// Mock service
class MockStatisticsService {
  getStatistics() {
    return of({ totalUsers: 100, totalFlights: 50 }); // Mock data
  }
}

describe('StatisticalComponent', () => {
  let component: StatisticalComponent;
  let fixture: ComponentFixture<StatisticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticalComponent],
      providers: [
        { useClass: MockStatisticsService } // Use mock service
      ]
    });
    fixture = TestBed.createComponent(StatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
