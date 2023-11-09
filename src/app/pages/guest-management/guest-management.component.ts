
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


    })
  }

  
   
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

}


