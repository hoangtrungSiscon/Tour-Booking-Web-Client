
import { Time } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { GuestApiService } from 'src/app/shared/services/guest-api.service';
import Swal from 'sweetalert2';
export interface GuestDetails {
  MaKhachHang: any;
  HoTenKh: any;
  Sdt:any;
  Phai: any;
  GmailKh: any;
  MaTaiKhoan: any
  // MaChuyenBay: any;
  // MaVe: any;
  
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {MaKhachHang: '1', HoTenKh: 'Anh A', Phai: 'Nam', GmailKh: 'A@GmailKh.com', MaChuyenBay: '1', MaVe: '01'},
//   //Generate 10 more for ELEMENT_DATA
//   {MaKhachHang: '2', HoTenKh: 'Anh B', Phai: 'Nam', GmailKh: 'B@GmailKh.com', MaChuyenBay: '2', MaVe: '02'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},

//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
//   {MaKhachHang: '3', HoTenKh: 'Co C', Phai: 'Nữ', GmailKh: 'C@GmailKh.com', MaChuyenBay: '3', MaVe: '03'},
// ];

@Component({
  selector: 'app-guest-management',
  templateUrl: './guest-management.component.html',
  styleUrls: ['./guest-management.component.scss']
})
export class GuestManagementComponent {
  // displayedColumns: any[] = ['MaKhachHang', 'HoTenKh', 'Phai', 'GmailKh', 'MaChuyenBay', 'MaVe'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }


  dataSource = new MatTableDataSource<GuestDetails>();
  GuestList: any[] = [];
  public displayedColumns: string[] = [
    'MaKhachHang',
    'HoTenKh',
    'Sdt',
    'Phai',
    'GmailKh',
    // 'MaChuyenBay',
    // 'MaVe',
    'MaTaiKhoan'
  ];
  GuestList$: Observable<GuestDetails[]>[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: GuestApiService) {

  }

  ngOnInit() : void{

    this.service.getGuestList().subscribe(data => {
      data.forEach(element => {
        this.GuestList.push(
          element
        )
      });

        this.dataSource.data = this.GuestList;

      console.log(this.dataSource.data)

    })
  }

  
   
  ngAfterViewInit(){

    console.log(this.dataSource.data)
    this.dataSource.paginator = this.paginator;
  }

}


