import { Component } from '@angular/core';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent {
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
      { y: 72.3, name: "ECO" },
      { y: 27.7, name: "BSN" }
    ]
    }]
  }	
}