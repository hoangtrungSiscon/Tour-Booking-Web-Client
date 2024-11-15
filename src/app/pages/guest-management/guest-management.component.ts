
import { Time } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { GuestApiService } from '../../shared/services/guest-api.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
export interface GuestDetails {
  MaKhachHang: any;
  HoTenKh: any;
  Sdt: any;
  Phai: any;
  GmailKh: any;
}


@Component({
  selector: 'app-guest-management',
  templateUrl: './guest-management.component.html',
  styleUrls: ['./guest-management.component.scss']
})
export class GuestManagementComponent {

  dataSource = new MatTableDataSource<GuestDetails>();
  GuestList: any[] = [];
  public displayedColumns: string[] = [
    'MaKhachHang',
    'HoTenKh',
    'Sdt',
    'Phai',
    'GmailKh',
    'ChiTiet'
  ];
  GuestList$: Observable<GuestDetails[]>[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: GuestApiService) {

  }
  getPattern(): string {
    const selectedField = (document.getElementById('select') as HTMLSelectElement).value;
    switch (selectedField) {
      case 'HoTen':
        return "[a-zA-Z ]+"; // Cho phép chữ cái và dấu trắng
      case 'MaKH':
        return "[0-9]+"; // Cho phép chữ số
      case 'Gmail':
        return "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"; // Cho phép email hợp lệ
      case 'Sdt':
        return "[0-9]+"; // Cho phép chữ số
      default:
        return ""; // Không có regex cho trường dữ liệu mặc định
    }
  }

  onSearch() {
    const searchValue = (document.getElementById('search') as HTMLInputElement).value;
    const selectedField = (document.getElementById('select') as HTMLSelectElement).value;
  
    // Check if searchValue is empty, if so, return all data
    if (!searchValue.trim()) {
      this.dataSource.data = this.GuestList;
      return;
    }
  
    // Validate search value based on selected field
    if (selectedField === 'HoTen' && !/^[a-zA-ZÀ-Ỹà-ỹ ]+$/.test(searchValue)) {
      Swal.fire('Lỗi!', 'Tên không được chứa ký tự số!', 'error');
      return;
    }
    if (selectedField === 'MaKH' && !/^[0-9]+$/.test(searchValue)) {
      Swal.fire('Lỗi!', 'Mã khách hàng chỉ được chứa ký tự số!', 'error');
      return;
    }
    if (selectedField === 'Sdt' && !/^[0-9]+$/.test(searchValue)) {
      Swal.fire('Lỗi!', 'Số điện thoại chỉ được chứa ký tự số!', 'error');
      return;
    }
  
    // Filter data based on search criteria
    const filteredData = this.GuestList.filter(guest => {
      switch (selectedField) {
        case 'HoTen':
          return guest.hoTenKh.toLowerCase().includes(searchValue.toLowerCase());
        case 'MaKH':
          return String(guest.makhachhang).includes(searchValue);
        case 'Gmail':
          return guest.gmailKh.toLowerCase().includes(searchValue.toLowerCase());
        case 'Sdt':
          return guest.sdt.toLowerCase().includes(searchValue.toLowerCase());
        default:
          return true;
      }
    });
  
    // Check if filteredData is empty and show a message
    if (filteredData.length === 0) {
      Swal.fire('Thông báo', 'Không có khách hàng trùng khớp thông tin cần tìm', 'info');
    }
  
    // Update dataSource with the filtered data
    this.dataSource.data = filteredData;
  }
  
  

  ngOnInit(): void {

    this.service.getGuest().subscribe(data => {
      data.forEach(element => {
        this.GuestList.push(
          element
        )
      });

      this.dataSource.data = this.GuestList;

    })
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}


