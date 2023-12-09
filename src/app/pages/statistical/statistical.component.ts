import { TicketApiService } from './../../shared/services/ticket-api.service';
import { GuestApiService } from './../../shared/services/guest-api.service';
import { Component, OnInit } from '@angular/core';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  doanhThuCacThang: any[] = [];
  thangNhoNhat: Date = new Date();
  tongSoTaiKhoan: number = 0;
  soLuongKhachHang: number = 0;
  mostTicketsCustomer: any;
  mostTicketsCustomerNames: string = '';
  constructor(
    private ticketService: TicketApiService,
    private guestService: GuestApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadGuestData();
    this.loadMostTicketsCustomer();
  }
  async loadMostTicketsCustomer(): Promise<void> {
    try {
      const data = await this.ticketService.getTicketList().toPromise();
  
      // Ensure data is not undefined before processing
      if (data !== undefined) {
        const ticketsByCustomer = this.groupTicketsByCustomer(data);
        this.mostTicketsCustomer = this.findCustomerWithMostTickets(ticketsByCustomer);
      } else {
        console.error('Data is undefined.');
      }
    } catch (error) {
      console.error(error);
    }
    return Promise.resolve();
  }
  
  groupTicketsByCustomer(data: any[]): Map<string, number> {
    const ticketsByCustomer = new Map<string, number>();
  
    for (const ticket of data) {
      // Check if hotenKH is defined before using it
      const customerName = ticket.hoTenKH !== undefined ? ticket.hoTenKH : 'Unknown';
  
      // Check if the customerName is already in the map
      if (ticketsByCustomer.has(customerName)) {
        // Increment the count for the existing customer
        ticketsByCustomer.set(customerName, (ticketsByCustomer.get(customerName) || 0) + 1);
      } else {
        // Add a new entry for the customer
        ticketsByCustomer.set(customerName, 1);
      }
    }
    console.log(ticketsByCustomer);
    
    return ticketsByCustomer;
  }
  
  findCustomerWithMostTickets(ticketsByCustomer: Map<string, number>): any[] {
    let maxTickets = 0;
    const mostTicketsCustomers: any[] = [];
  
    for (const [customerName, ticketCount] of ticketsByCustomer.entries()) {
      if (ticketCount > maxTickets) {
        maxTickets = ticketCount;
        // If a new maximum is found, reset the array with the new customer
        mostTicketsCustomers.length = 0;
        mostTicketsCustomers.push({ hoTenKH: customerName, ticketCount: maxTickets });
      } else if (ticketCount === maxTickets) {
        // If count is equal to the current maximum, add to the array
        mostTicketsCustomers.push({ hoTenKH: customerName, ticketCount: maxTickets });
      }
    }
  
    console.log(mostTicketsCustomers);
    this.mostTicketsCustomerNames = mostTicketsCustomers.map(customer => customer.hoTenKH).join(', ');
    return mostTicketsCustomers;
  }
  
  async loadData() {
    try {
      const data = await this.ticketService.getTicketList().toPromise();
  
      // Kiểm tra xem data có tồn tại không
      if (data) {
        this.doanhThuCacThang = this.getLastFourMonthsData(data as any);
        this.thangNhoNhat = this.getSmallestMonth(data as any);
      } else {
        console.error('Data is undefined or null.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async loadGuestData() {
    try {
      const data = await this.guestService.getGuest().toPromise();
  
      // Kiểm tra xem data có tồn tại không
      if (data) {
        // Tính tổng số tài khoản và số lượng khách hàng từ dữ liệu API
        this.tongSoTaiKhoan = data.length;
        this.soLuongKhachHang = data.length;
      } else {
        console.error('Data is undefined or null.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  onChartDataUpdated(updatedData: any[]) {
    this.doanhThuCacThang = updatedData;
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

  getSmallestMonth(data: any[]): Date {
    const sortedData = data
      .map(item => new Date(item.ngayDatVe))
      .sort((a, b) => a.getTime() - b.getTime());

    return sortedData.length > 0 ? sortedData[0] : new Date();
  }
}
