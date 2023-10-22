import { Component } from '@angular/core';

@Component({
  selector: 'app-column-charts',
  templateUrl: './column-charts.component.html',
  styleUrls: ['./column-charts.component.scss']
})
export class ColumnChartsComponent {
  chart: any;
 
  chartOptions = {
    theme: "light1",
    title:{
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
    axisY: {
       includeZero: true
    },
    data: [{
      type: "stackedColumn",
      name: "ECO",
      showInLegend: true,
      dataPoints: [
        { label: "Qtr 1", y: 19729 },
        { label: "Qtr 2", y: 22127 },
        { label: "Qtr 3", y: 12654 },
        { label: "Qtr 4", y: 22914 }
      ]
    }, {
        type: "stackedColumn",
        name: "BSN",
        showInLegend: true,
        dataPoints: [
          { label: "Qtr 1", y: 4288 },
          { label: "Qtr 2", y: 6390 },
          { label: "Qtr 3", y: 3510 },
          { label: "Qtr 4", y: 3876 }
        ]
    }]
  }
}
