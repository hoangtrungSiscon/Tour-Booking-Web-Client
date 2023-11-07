import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FlightApiService } from 'src/app/shared/services/flight-api.service';
import Swal from 'sweetalert2';
import { FlightDetails } from 'src/app/shared/models/FlightDetailModel';

@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
})
export class AdminFlightManagementComponent {
  dataSource = new MatTableDataSource<FlightDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  flightList: any[] = [];
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
    'edit',
    'delete',
  ];
  


  deleteFlight(event: any, id: any): void {
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
  search(event: any, searchValue: any) {
    if (this.searchValue == '') {
      this.dataSource.data = [];
      this.flightList = [];
      this.ngOnInit();
    }
    else {

      this.flightList = [];
      // this.ngOnInit();
      this.dataSource.data = [];
      // this.dataSource.data = this.flightList.filter((flight) => {
      //   // return flight.maChuyenBay.toLowerCase().includes(this.searchValue.toLowerCase());
      //   console.log(flight);
      // });
      this.service.getFlightList().subscribe(data => {
        data.forEach(element => {
          if (element.maChuyenBay.toLowerCase().includes(this.searchValue.toLowerCase())){
            this.flightList.push(
              element
            )
          }
          
        });
          this.dataSource.data = this.flightList;
  
        console.log(this.dataSource.data)
  
      })
    }
    // console.log(this.searchValue)
    // this.dataSource.data = this.flightList.filter((flight) => {
    //   return flight.MaChuyenBay.toLowerCase().includes(this.searchValue.toLowerCase());
    // });
  }

  filter(event : any
    // , departureLocation : any, departureDate : any, arrivalLocation : any
    ){
    if (

      this.departureLocation == '' &&
      this.arrivalLocation == '' &&
      this.departureDate == ''
    ) {
      this.dataSource.data = [];
      this.flightList = [];
      this.ngOnInit();
    }
    else {
      this.flightList = [];

      this.dataSource.data = [];

      if (
        this.departureLocation != '' &&
        this.arrivalLocation != '' &&
        this.departureDate != ''
      ){
        this.service.getFlightList().subscribe(data => {
          data.forEach(element => {
            if (
              // element.maChuyenBay.toLowerCase().includes(this.searchValue.toLowerCase())
              element.ngayXuatPhat.slice(0,10) == this.departureDate &&
              element.noiXuatPhat == this.departureLocation &&
              element.noiDen == this.arrivalLocation
            
            ){
              this.flightList.push(
                element
              )
            }
            
          });
          this.dataSource.data = this.flightList;
    
          console.log(this.dataSource.data)
    
        })
      }
    }
  }

  
  
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
      this.dataSource.paginator = this.paginator;
    })
  }

  
   
  ngAfterViewInit(){

    // console.log(this.dataSource.data)
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
    
    // console.log(this.dataSource.data)
  }
}
