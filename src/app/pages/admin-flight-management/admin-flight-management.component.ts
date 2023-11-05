import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FlightApiService } from 'src/app/services/flight-api.service';
import Swal from 'sweetalert2';
import { FlightDetails } from 'src/app/models/FlightDetailModel';

@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
})
export class AdminFlightManagementComponent {
  dataSource = new MatTableDataSource<FlightDetails>();
  flightList: any[] = [];
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
    'edit',
    'delete',
  ];
  flightList$: Observable<FlightDetails[]>[] = [];


  deleteFlight(event: any, id: any): void {
    // alert(id);
    // this.service.deleteFlight(id).subscribe(
    //   () => {
    //     console.log('Deleted successfully');
    //     window.location.reload();
    //     // this.refreshPage();
    //   }
    // );


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
            console.log('Deleted successfully');
            Swal.fire(
              'Đã xóa!',
              'Xóa thông tin chuyến bay thành công.',
              'success'
            ).then(() => {
              window.location.reload();
            })
          },
          (error) => {
            Swal.fire(
              'Xóa không thành công!',
              'Đã xảy ra lỗi khi xóa thông tin chuyến bay này.',
              'error'
            );
          }
        );
        
      }
    })
  }

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // listFlight !: FlightDetails[];
  constructor(private service: FlightApiService) {

  }

  // refreshPage(): void{
  //   window.location.reload();
  // }
  ngOnInit() : void{

    this.service.getFlightList().subscribe(data => {
      data.forEach(element => {
        this.flightList.push(
          element
        )
      });

        this.dataSource.data = this.flightList;

      console.log(this.dataSource.data)

    })
  }

  
   
  ngAfterViewInit(){

    console.log(this.dataSource.data)
    this.dataSource.paginator = this.paginator;
  }
}
