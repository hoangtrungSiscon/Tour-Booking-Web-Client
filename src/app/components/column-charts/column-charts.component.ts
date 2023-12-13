import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketApiService } from './../../shared/services/ticket-api.service';

@Component({
  selector: 'app-column-charts',
  templateUrl: './column-charts.component.html',
  styleUrls: ['./column-charts.component.scss']
})
export class ColumnChartsComponent implements OnInit {
  chart: any;

  chartOptions = {
    theme: "light1",
    title: {
      text: "Revenue for months"
    },
    animationEnabled: true,
    toolTip: {
      shared: true
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      reversed: true
    },
    axisX: {
			valueFormatString: "DD MMM",
      
		},
    axisY: {
      includeZero: true
    },
    data: [{
      type: "stackedColumn",
      name: "ECO",
      showInLegend: true,
      dataPoints: [] as { x: Date; y: number }[] // Đặt kiểu cho dataPoints

    }, {
      type: "stackedColumn",
      name: "BSN",
      showInLegend: true,
      dataPoints: [] as { x: Date; y: number }[] // Đặt kiểu cho dataPoints

    }]
  };
  @Output() chartDataUpdated: EventEmitter<any> = new EventEmitter();
  constructor(private service: TicketApiService) { }

  ngOnInit(): void {
    
    this.loadData();
  }

  async loadData() {
    try {
      const data = await this.service.getTicketList().toPromise();
      const lastFourMonthsData = this.getLastFourMonthsData(data as any);
      this.updateChartData(lastFourMonthsData);
    } catch (error) {
      console.error(error);
    }
  }
  

  getLastFourMonthsData(data: any[]): any[] {
    // Chuyển đổi ngày thành đối tượng Date và sắp xếp theo thứ tự giảm dần
    const sortedData = data
      .map(item => ({ ...item, ngayDatVe: new Date(item.ngayDatVe) }))
      .sort((a, b) => b.ngayDatVe - a.ngayDatVe);
  
    // Lấy ngày của bản ghi có ngàyDatVe lớn nhất
    const latestDate = sortedData.length > 0 ? sortedData[0].ngayDatVe : null;
  
    if (!latestDate) {
      return []; // Trả về mảng rỗng nếu không có dữ liệu
    }
  
    // Lấy tháng của ngày lớn nhất
    const latestMonth = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1);
  
    // Giảm tháng đi 3
    const targetMonth = new Date(latestMonth);
    targetMonth.setMonth(targetMonth.getMonth() - 3);
  
    // Lọc ra dữ liệu cho các tháng từ ngày cuối cùng có dữ liệu đến tháng giảm 3
    const lastFourMonthsData = [];
    for (let i = 0; i < sortedData.length; i++) {
      const itemMonth = new Date(sortedData[i].ngayDatVe.getFullYear(), sortedData[i].ngayDatVe.getMonth(), 1);
  
      if (itemMonth >= targetMonth) {
        lastFourMonthsData.push(sortedData[i]);
      }
    }
    
    
    return lastFourMonthsData;
  }
  
  mapToDataPoints(data: any[], loaiVe: string): { x: Date; y: number }[] {
    const dataPoints: { x: Date; y: number }[] = [];
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
  
      if (item === null || typeof item !== 'object' || typeof item.ngayDatVe !== 'object') {
        // Trường hợp item là null hoặc không phải là object hoặc không có thuộc tính ngayDatVe
        dataPoints.push({ x: new Date(), y: 0 }); // Hoặc bạn có thể trả về giá trị mặc định khác tùy thuộc vào logic của bạn
      } else {
        const itemMonth = new Date(item.ngayDatVe.getFullYear(), item.ngayDatVe.getMonth(), 1);
        
        const existingPoint = dataPoints.find(point => point.x.getTime() === itemMonth.getTime());
  
        if (existingPoint) {
          // Nếu đã có dữ liệu cho tháng này, cộng thêm số lượng
          existingPoint.y += item.loaiVe.trim() === loaiVe ? item.soluong : 0;
        } else {
          // Nếu chưa có dữ liệu cho tháng này, thêm mới
          dataPoints.push({
            x: itemMonth,
            y: item.loaiVe.trim() === loaiVe ? item.soluong : 0,
          });
        }
      }
  
      if (dataPoints.length >= 4) {
        // Đã đạt tới giới hạn 4 dữ liệu, thoát khỏi vòng lặp
        break;
      }
    }
    
    
    return dataPoints;
  }
  

  
  

  updateChartData(lastFourMonthsData: any[]) {
    // Map dữ liệu thành dataPoints cho ECO và BSN
    
    const ecoDataPoints = this.mapToDataPoints(lastFourMonthsData, 'ECO');
    const bsnDataPoints = this.mapToDataPoints(lastFourMonthsData, 'BSN');

    // Cập nhật dataPoints cho biểu đồ
    this.chartOptions.data[0].dataPoints = ecoDataPoints;
    this.chartOptions.data[1].dataPoints = bsnDataPoints;

    // Gửi dữ liệu cập nhật đến component cha
    this.chartDataUpdated.emit(lastFourMonthsData);
  }

}
