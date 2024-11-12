import { Time } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnInit  } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ChiTietVeService } from '../../shared/services/chiTietVe.service';
import { ChiTietVe } from '../../shared/models/chiTietVe';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

export interface TicketDetails {
  maCTV: number,
  maVe: number;
  ngayDatVe: Date;
  maKh: number;
  tenKhachHang: string;
  maChuyenBay: string;
  loaiVe: string;
  soLuong: number;
  tongGia: number;
  tinhTrang: string;
  maGiaoDich: string;
  tenKieuThanhToan: string;
}

@Component({
  selector: 'app-admin-ticket-management',
  templateUrl: './admin-ticket-management.component.html',
  styleUrls: ['./admin-ticket-management.component.scss']
})
export class AdminTicketManagementComponent implements AfterViewInit, OnInit{
  form: FormGroup | any;
  displayedColumns: string[] = [
    'maCTV', 
    'maVe',
    'ngayDatVe',
    'maKh',
    'tenKhachHang',
    'maChuyenBay',
    'loaiVe',
    'soLuong',
    'tongGia',
    'tinhTrang',
    'maGiaoDich',
    'tenKieuThanhToan',
    'action'
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
      MaCTV: element.maCTV,
      MaVe: element.maVe,

      LoaiVe: element.loaiVe.trim(),
      
      MaChuyenBay: element.maChuyenBay,
      
      SoLuong: element.soLuong,
      
      TinhTrang: 'Đã duyệt',
      TongGia: element.tongGia,
    };
    console.log(request);
    this.chiTietVeService.update(request).subscribe(
      () => {
        Swal.fire(
          'Duyệt thành công!',
          'Đã duyệt vé thành công.',
          'success'
        ).then(() => {
          this.dataSource.data = [];
          this.chiTietVes = [];
          this.getAllChiTietVe();
        })
      }, (error) => {
        Swal.fire(
          'Duyệt thất bại!',
          'Duyệt vé không thành công.',
          'error'
        )
      }
    )
  }

  onCancel(element: TicketDetails){
    let request: ChiTietVe = {
      MaCTV: element.maCTV,
      MaVe: element.maVe,

      LoaiVe: element.loaiVe,
      
      MaChuyenBay: element.maChuyenBay,
      
      SoLuong: element.soLuong,
      
      TinhTrang: 'Đã hủy',
      TongGia: element.tongGia,
    };
    this.chiTietVeService.update(request).subscribe(
      () => {
        Swal.fire(
          'Hủy thành công!',
          'Đã hủy vé thành công.',
          'success'
        ).then(() => {
          this.dataSource.data = [];
          this.chiTietVes = [];
          this.getAllChiTietVe();
        })
      }, (error) => {
        Swal.fire(
          'Hủy thất bại!',
          'Hủy vé không thành công.',
          'error'
        )
      }
    )
  }

  onDelete(elementId: number){
    this.chiTietVeService.delete(elementId).subscribe(
      () => {
        Swal.fire(
          'Xóa thành công!',
          'Đã xóa vé thành công.',
          'success'
        ).then(() => {
          this.dataSource.data = [];
          this.chiTietVes = [];
          this.getAllChiTietVe();
        })
      }, (error) => {
        Swal.fire(
          'Xóa thất bại!',
          'Xóa vé không thành công.',
          'error'
        )
      }
    )
  }

}
