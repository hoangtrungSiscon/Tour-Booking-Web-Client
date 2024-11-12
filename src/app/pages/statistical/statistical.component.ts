import { TicketApiService } from '../../shared/services/ticket-api.service';
import { GuestApiService } from '../../shared/services/guest-api.service';
import { Component, OnInit } from '@angular/core';
import { FlightApiService } from '../../shared/services/flight-api.service';
import { DatePipe, registerLocaleData } from '@angular/common'; // Import DatePipe and CurrencyPipe
import localeVi from '@angular/common/locales/vi';
import { da } from 'date-fns/locale';

registerLocaleData(localeVi);
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
  providers: [DatePipe]
})
export class StatisticalComponent implements OnInit {
  majorityGender: string = '';
  doanhThuCacThang: any[] = [];
  thangNhoNhat: Date = new Date();
  tongSoTaiKhoan: number = 0;
  soLuongKhachHang: number = 0;
  mostTicketsCustomer: any;
  mostTicketsCustomerNames: string = '';
  mostBookedFlightCode: string='';
  ticketList: any[] = [];
  mostBookedDate: string = '';
  currentMonth: string | null ='';
  currentMonthTotalRevenue: string | null ='';
  previousMonth: string | null ='';
  previousMonthTotalRevenue: string | null = '';
  constructor(
    private ticketService: TicketApiService,
    private guestService: GuestApiService,
    private flightService: FlightApiService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadCurrentMonthTotalRevenue();
    this.loadGuestData();
    this.loadMostTicketsCustomer();
    this.loadMostBookedFlightCode();
    this.loadTicketList();
    this.loadPreviousMonthTotalRevenue();
  }
  loadPreviousMonthTotalRevenue(): void {
    const currentDate = new Date();
  
    // Set the locale to 'vi' for Vietnamese
    const monthNamesVi: string[] = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ];
  
    // Get the date of the last month
    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  
    // Set the currentMonth and previousMonthTotalRevenue properties
    this.previousMonth = monthNamesVi[lastMonthDate.getMonth()]; // Fix here
    this.previousMonthTotalRevenue = this.datePipe.transform(lastMonthDate, 'MMMM', 'vi') || '';
  
    this.ticketService.getPreviousMonthTotalRevenue().subscribe(
      (totalpreviousRevenue: number | null) => {
        // Perform null check before formatting the total revenue
        if (totalpreviousRevenue !== null) {
          // Convert totalRevenue to a string and append ' VND'
          this.previousMonthTotalRevenue = totalpreviousRevenue.toString() + ' VND';
        } else {
          this.previousMonthTotalRevenue = '';
        }
  
        console.log(this.previousMonthTotalRevenue);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  loadCurrentMonthTotalRevenue(): void {
    const currentDate = new Date();

    // Set the locale to 'vi' for Vietnamese
    const monthNamesVi: string[] = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ];
    
    this.currentMonth = this.datePipe.transform(currentDate, 'MMMM', 'vi') || '';
    this.currentMonth = monthNamesVi[currentDate.getMonth()];

    this.ticketService.getCurrentMonthTotalRevenue().subscribe(
      (totalRevenue: number | null) => {
        // Perform null check before formatting the total revenue
        if (totalRevenue !== null) {
          // Convert totalRevenue to a string and append ' VND'
          this.currentMonthTotalRevenue = totalRevenue.toString() + ' VND';
        } else {
          this.currentMonthTotalRevenue = '';
        }

        console.log(this.currentMonthTotalRevenue);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  private parseCurrencyString(currencyString: string): number {
    // Remove non-numeric characters from the currency string
    const numericString = currencyString.replace(/[^0-9.-]/g, '');
  
    // Parse the numeric string to a float
    return parseFloat(numericString);
  }
  
  
  loadTicketList(): void {
    this.ticketService.getTicketList().subscribe(
      (data: any[]) => {
        this.ticketList = data;
        
        this.findMostBookedDate();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  findMostBookedDate(): void {
    // Create an object to store the count of each date
    const dateCounts = this.ticketList.reduce((acc, ticket) => {
      // Assuming 'ngayXuatPhat' is the property containing the date
      const date = new Date(ticket.ngayDatVe);
  
      // Format the date to 'dd/MM/yyyy'
      const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
      // Increment the count for the formatted date in the accumulator
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
  
      return acc;
    }, {});
  
    // Find the formatted date with the highest count
    const mostBookedDate = Object.keys(dateCounts).reduce((a, b) => dateCounts[a] > dateCounts[b] ? a : b);
  
    // Set the mostBookedDate property
    this.mostBookedDate = mostBookedDate;
    console.log(mostBookedDate);
    // Log the result to the console
  }
  
  
  loadMostBookedFlightCode(): void {
    this.flightService.getMostBookedFlight().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.mostBookedFlightCode = data[0].maChuyenBay.substring(6);
          console.log(this.mostBookedFlightCode);
        } else {
          this.mostBookedFlightCode = ''; // or provide a default value
        }
      },
      (error) => {
        console.error(error);
      }
    );
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
        this.calculateMajorityGender(data);
      } else {
        console.error('Data is undefined or null.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  calculateMajorityGender(data: any[]): void {
    // Tính toán giới tính đa số từ dữ liệu khách hàng
    
    const maleCount = data.filter(customer => customer.phai === 'Nam').length;
    const femaleCount = data.filter(customer => customer.phai === 'Nữ').length;
  
    // So sánh và gán giới tính đa số
    this.majorityGender = maleCount > femaleCount ? 'nam giới' : 'nữ giới';
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
