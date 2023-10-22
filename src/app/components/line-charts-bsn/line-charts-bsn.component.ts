import { Component } from '@angular/core';

@Component({
	selector: 'app-line-charts-bsn',
	templateUrl: './line-charts-bsn.component.html',
	styleUrls: ['./line-charts-bsn.component.scss']
})
export class LineChartsBSNComponent {
	chartOptions = {
		animationEnabled: true,
		theme: "light1",
		title: {
			text: "BSN tickets chart"
		},
		axisX: {
			valueFormatString: "DD MMM",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Number of Tickets",
			crosshair: {
				enabled: true
			}
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "right",
			dockInsidePlotArea: true,
			itemclick: function (e: any) {
				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else {
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: "Total Ticket",
			lineDashType: "dash",
			markerType: "square",
			xValueFormatString: "DD MMM, YYYY",
			dataPoints: [
				{ x: new Date(2022, 0, 3), y: 650 },
				{ x: new Date(2022, 0, 4), y: 700 },
				{ x: new Date(2022, 0, 5), y: 710 },
				{ x: new Date(2022, 0, 6), y: 658 },
				{ x: new Date(2022, 0, 7), y: 734 },
				{ x: new Date(2022, 0, 8), y: 963 },
				{ x: new Date(2022, 0, 9), y: 847 },
				{ x: new Date(2022, 0, 10), y: 853 },
				{ x: new Date(2022, 0, 11), y: 869 },
				{ x: new Date(2022, 0, 12), y: 943 },
				{ x: new Date(2022, 0, 13), y: 970 },
				{ x: new Date(2022, 0, 14), y: 869 },
				{ x: new Date(2022, 0, 15), y: 890 },
				{ x: new Date(2022, 0, 16), y: 930 }
			]
		},
		{
			type: "line",
			showInLegend: true,
			name: "BSN Ticket",
			lineDashType: "dot",
			dataPoints: [
				{ x: new Date(2022, 0, 3), y: 140 },
				{ x: new Date(2022, 0, 4), y: 140 },
				{ x: new Date(2022, 0, 5), y: 170 },
				{ x: new Date(2022, 0, 6), y: 100 },
				{ x: new Date(2022, 0, 7), y: 190 },
				{ x: new Date(2022, 0, 8), y: 270 },
				{ x: new Date(2022, 0, 9), y: 190 },
				{ x: new Date(2022, 0, 10), y: 190 },
				{ x: new Date(2022, 0, 11), y: 230 },
				{ x: new Date(2022, 0, 12), y: 270 },
				{ x: new Date(2022, 0, 13), y: 310 },
				{ x: new Date(2022, 0, 14), y: 307 },
				{ x: new Date(2022, 0, 15), y: 247 },
				{ x: new Date(2022, 0, 16), y: 360 }
			]
		}]
	}
}
