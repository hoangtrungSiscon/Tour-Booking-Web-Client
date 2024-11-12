import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FlightApiService } from '../../shared/services/flight-api.service';
import { PlaneApiService } from '../../shared/services/plane-api.service';
import Swal from 'sweetalert2';
import { FlightDetails } from '../../shared/models/FlightDetailModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
})
export class AdminFlightManagementComponent {
  dataSource = new MatTableDataSource<FlightDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchValue: string = '';
  departureLocation: string = '';
  arrivalLocation: string = '';
  departureDate: string = '';
  public displayedColumns: string[] = [
    'MaChuyenBay',
    'MaMayBay',
    'TenMayBay',
    'NoiXuatPhat',
    'NoiDen',
    'NgayXuatPhat',
    'GioBay',
    'SoLuongVeBsn',
    'SoLuongVeEco',
    'DonGia',
    'action'
  ];
  constructor(
    private service: FlightApiService,
    private router: Router,
    private planeService: PlaneApiService
    ) {}

  ngOnInit(): void {
    this.service.getFlightList("", "", "", "").subscribe(data => {
      this.dataSource.data = data;
    })
  }

  deleteFlight(id: any): void {
    Swal.fire({
      title: 'Xóa thông tin chuyến bay này?',
      text: "Thông tin chuyến bay bị xóa không thể được khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteFlight(id).subscribe(
          () => {
            Swal.fire(
              'Đã xóa!',
              'Xóa thông tin chuyến bay thành công.',
              'success'
            ).then(() => {
              this.service.getFlightList("", "", "", "").subscribe(data => {
                this.dataSource.data = data;
              })
            })
          },
          (error) => {
            Swal.fire(
              'Không thể xóa chuyến bay!',
              'Đã xảy ra lỗi khi xóa thông tin chuyến bay này.',
              'error'
            );
          }
        );

      }
    })
  }

  filter() {
    this.dataSource.data = [];
    this.service.getFlightList(this.searchValue, this.departureLocation, this.arrivalLocation, this.departureDate.toString()).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  toEdit(flightId: string) {
    this.router.navigate(['/admin-dashboard/edit-flight', flightId])
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
  reloadValue() {
    this.arrivalLocation = '';
    this.departureLocation = '';
    this.departureDate = '';
    this.searchValue = '';

    this.ngOnInit();
  }
}
