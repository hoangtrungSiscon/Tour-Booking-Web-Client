import { Time } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnInit  } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ChiTietVeService } from 'src/app/shared/services/chiTietVe.service';
import { ChiTietVe } from 'src/app/shared/models/chiTietVe';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TicketDetails {
  maVe: number;
  ngayDatVe: Date;
  maKh: number;
  tenKhachHang: string;
  maChuyenBay: string;
  loaiVe: string;
  soLuong: number;
  tongGia: number;
  tinhTrang: string;
}

// const ELEMENT_DATA: TicketDetails[] = [
//   {ticket_id: '1', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '2', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '3', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '4', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '5', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '6', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '7', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '8', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '9', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '10', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '11', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '12', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
//   {ticket_id: '13', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},

// ];

@Component({
  selector: 'app-admin-ticket-management',
  templateUrl: './admin-ticket-management.component.html',
  styleUrls: ['./admin-ticket-management.component.scss']
})
export class AdminTicketManagementComponent implements AfterViewInit, OnInit{
  form: FormGroup | any;
  displayedColumns: string[] = [
    'maVe',
    'ngayDatVe',
    'maKh',
    'tenKhachHang',
    'maChuyenBay',
    'loaiVe',
    'soLuong',
    'tongGia',
    'approve',
    'cancel', 
    'delete'
  ];
  chiTietVes: TicketDetails[] = [];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private chiTietVeService: ChiTietVeService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.form = this.createForm();
    this.getAllChiTietVe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }

  createForm(){
    return this.formBuilder.group({
      fromPlace: this.formBuilder.control(''),
      toPlace: this.formBuilder.control(''),
      bookDate: this.formBuilder.control(''),
      startDate: this.formBuilder.control(''),
      typeSeat: this.formBuilder.control(''),
    })
  }

  onSubmit(){
    this.chiTietVeService.filterChiTietVe(this.form.value).subscribe(data => {
      this.chiTietVes = data;
      this.dataSource = new MatTableDataSource<TicketDetails>(this.chiTietVes);
    })
  }

  getAllChiTietVe(){
    this.chiTietVeService.getAll().subscribe(data=> {
      this.chiTietVes = data;
      this.dataSource = new MatTableDataSource<TicketDetails>(this.chiTietVes);
    })
  }


  onApprove(element: TicketDetails){
    let request: ChiTietVe = {
      MaVe: element.maVe,

      LoaiVe: element.loaiVe,
      
      MaChuyenBay: element.maChuyenBay,
      
      SoLuong: element.soLuong,
      
      TinhTrang: 'Đã duyệt',
      TongGia: element.tongGia,
    };
    this.chiTietVeService.update(request).subscribe();
  }

  onCancle(element: TicketDetails){
    let request: ChiTietVe = {
      MaVe: element.maVe,

      LoaiVe: element.loaiVe,
      
      MaChuyenBay: element.maChuyenBay,
      
      SoLuong: element.soLuong,
      
      TinhTrang: 'Đã hủy',
      TongGia: element.tongGia,
    };
    this.chiTietVeService.update(request).subscribe();
  }

  onDelete(elementId: number){
    this.chiTietVeService.delete(elementId).subscribe(()=>{
      this.getAllChiTietVe();
    });
  }

}
