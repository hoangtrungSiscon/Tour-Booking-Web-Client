import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FlightApiService } from 'src/app/shared/services/flight-api.service';
import { PlaneApiService } from 'src/app/shared/services/plane-api.service';
import Swal from 'sweetalert2';
import { FlightDetails } from 'src/app/shared/models/FlightDetailModel';
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
  public planeList: any[] = []
  public flightList: any[] = []
  constructor(
    private service: FlightApiService,
    private router: Router,
    private planeService: PlaneApiService
    ) {}

  ngOnInit(): void {
    this.planeService.getPlaneList().subscribe(data => {
      this.planeList = data;
    })
    this.service.getFlightList("", "", "", "").subscribe(data => {
      // this.dataSource.data = data;
      this.flightList = data;
      this.flightList.forEach(element => {
        const planeData = this.planeList.find(x => x.maMayBay == element.maMayBay)
        if (planeData){
          element.soLuongVeBsn = element.soLuongVeBsn + '/' + planeData.slgheBsn
          element.soLuongVeEco = element.soLuongVeEco + '/' + planeData.slgheEco
        }
      });
      setTimeout(() => {
        this.dataSource.data = this.flightList
      }, 500);
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
  search(searchValue: any) {
    if (this.searchValue == '') {
      this.dataSource.data = [];
      this.ngOnInit();
    }
    else {
      this.dataSource.data = [];
      this.service.getFlightListById(this.searchValue).subscribe(data => {
        this.dataSource.data = data;
      })
    }
  }

  filter() {
    this.dataSource.data = [];
    this.service.getFlightList(this.searchValue, this.departureLocation, this.arrivalLocation, this.departureDate.toString()).subscribe(data => {
      this.dataSource.data = data
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
