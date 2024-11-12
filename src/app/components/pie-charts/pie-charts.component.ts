import { TicketApiService } from '../../shared/services/ticket-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements OnInit {
  ticketData: any[] = [];
  loading = true;

  chartOptions = {
    animationEnabled: true,
    title: {
      text: "Total Ticket"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 0, name: "ECO" },
        { y: 0, name: "BSN" }
      ] as { y: number; name: string; }[]
    }]
  };

  constructor(private service: TicketApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      const data = await this.service.getTicketList().toPromise();
      this.ticketData = data ?? [];
      this.calculatePercentage();
      this.loading = false; // Đã tải xong dữ liệu
    } catch (error) {
      console.error(error);
      this.loading = false; // Có lỗi, cũng đặt loading thành false để không hiển thị biểu đồ
    }
  }

  calculatePercentage() {
    const totalTickets = this.ticketData.length;
    const ecoTickets = this.ticketData.filter(ticket => ticket.loaiVe.trim() === 'ECO').length;
    const bsnTickets = this.ticketData.filter(ticket => ticket.loaiVe.trim() === 'BSN').length;

    const ecoPercentage = (ecoTickets / totalTickets) * 100;
    const bsnPercentage = (bsnTickets / totalTickets) * 100;

    this.chartOptions.data[0].dataPoints = [
      { y: ecoPercentage, name: "ECO" },
      { y: bsnPercentage, name: "BSN" }
    ];
  }
}
