import { Time } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnInit  } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ChiTietVeService } from 'src/app/shared/services/chiTietVe.service';
import { ChiTietVe } from 'src/app/shared/models/chiTietVe';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      MaCTV: element.maCTV,
      MaVe: element.maVe,

      LoaiVe: element.loaiVe,
      
      MaChuyenBay: element.maChuyenBay,
      
      SoLuong: element.soLuong,
      
      TinhTrang: 'Đã duyệt',
      TongGia: element.tongGia,
    };
    try{
      this.chiTietVeService.update(request).subscribe();
      alert("Duyệt thành công!");
      this.dataSource.data = [];
      this.chiTietVes = [];
      this.getAllChiTietVe();
    }
    catch{
      alert("Duyệt thất bại!");
    }
  }

  onCancle(element: TicketDetails){
    let request: ChiTietVe = {
      MaCTV: element.maCTV,
      MaVe: element.maVe,

      LoaiVe: element.loaiVe,
      
      MaChuyenBay: element.maChuyenBay,
      
      SoLuong: element.soLuong,
      
      TinhTrang: 'Đã hủy',
      TongGia: element.tongGia,
    };try{
      this.chiTietVeService.update(request).subscribe();
      alert("Hủy thành công!");
      this.dataSource.data = [];
      this.chiTietVes = [];
      this.getAllChiTietVe();
    }
    catch{
      alert("Hủy thất bại!");
    }
  }

  onDelete(elementId: number){
    try{
      this.chiTietVeService.delete(elementId).subscribe(()=>{
        this.getAllChiTietVe();
      });
      alert("Xóa vé thành công!");
      this.dataSource.data = [];
      this.chiTietVes = [];
      this.getAllChiTietVe();
    }
    catch{
      alert("Xóa vé thất bại!");
    }
    
  }

}
