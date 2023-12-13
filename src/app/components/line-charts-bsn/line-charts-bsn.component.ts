import { TicketApiService } from './../../shared/services/ticket-api.service';
import { Component, OnInit } from '@angular/core';

export interface TicketDetails {
	maVe: any;
	maKH: any;
	ngayDatVe: any;
	loaiVe: any;
	maChuyenBay: any;
	soluong: any;
	tinhTrang: any;
	tongGia: any;
}

@Component({
	selector: 'app-line-charts-bsn',
	templateUrl: './line-charts-bsn.component.html',
	styleUrls: ['./line-charts-bsn.component.scss']
})
export class LineChartsBSNComponent  implements OnInit {
	TicketList: TicketDetails[] = [];

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
		data: [
			{
				type: 'line',
				showInLegend: true,
				name: 'Total Ticket',
				lineDashType: 'dash',
				markerType: 'square',
				xValueFormatString: 'DD MMM, YYYY',
				dataPoints: [] as { x: Date; y: any; }[],
			},
			{
				type: 'line',
				showInLegend: true,
				name: 'bsn Ticket',
				lineDashType: 'dot',
				markerType: 'circle',
				xValueFormatString: 'DD MMM, YYYY',
				dataPoints: [] as { x: Date; y: any; }[],
			},
		],
	};

	constructor(private service: TicketApiService) { }

	updateChartData() {
		const dateTicketMap = new Map<string, { total: number; bsn: number }>();
	  
		this.TicketList.forEach((ticket) => {
		  const dateString = new Date(ticket.ngayDatVe).toLocaleDateString();
	  
		  if (!dateTicketMap.has(dateString)) {
			dateTicketMap.set(dateString, { total: 0, bsn: 0 });
		  }
	  
		  dateTicketMap.get(dateString)!.total += ticket.soluong;
	  
		  if (ticket.loaiVe.trim() === 'BSN') {
			dateTicketMap.get(dateString)!.bsn += ticket.soluong;
		  }
		});
	  
		const totalTicketDataPoints = Array.from(dateTicketMap).map(([dateString, values]) => ({
		  x: new Date(dateString),
		  y: values.total,
		}));
	  
		const bsnTicketDataPoints = Array.from(dateTicketMap).map(([dateString, values]) => ({
		  x: new Date(dateString),
		  y: values.bsn,
		}));
	  
		// Update the chart data
		this.chartOptions.data = [
		  {
			type: 'line',
			showInLegend: true,
			name: 'Total Ticket',
			lineDashType: 'dash',
			markerType: 'square',
			xValueFormatString: 'DD MMM, YYYY',
			dataPoints: totalTicketDataPoints,
		  },
		  {
			type: 'line',
			showInLegend: true,
			name: 'bsn Ticket',
			lineDashType: 'dot',
			markerType: 'circle',
			xValueFormatString: 'DD MMM, YYYY',
			dataPoints: bsnTicketDataPoints,
		  },
		];
	  }
	  

	async ngOnInit(): Promise<void> {
		try {
			const data = await this.service.getTicketList().toPromise();
			this.TicketList = data ?? [];
			this.updateChartData();
		} catch (error) {
			console.error(error);
		}
	}
}
