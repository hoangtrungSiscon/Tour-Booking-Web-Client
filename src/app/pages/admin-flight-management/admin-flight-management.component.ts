import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FlightApiService } from 'src/app/services/flight-api.service';

export interface FlightDetails {
  MaChuyenBay: any;
  MaMayBay: any;
  TenMayBay: any;
  NoiXuatPhat: any;
  NoiDen: any;
  NgayXuatPhat: any;
  GioBay: any;
  SoLuongVeBsn: any;
  SoLuongVeEco: any;
  DonGia: any;
}

@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
})
export class AdminFlightManagementComponent {
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
  // flightList$!: Observable<FlightDetails[]>;
  // dataSource!: MatTableDataSource<FlightDetails>;

  // // public dataSource: FlightDetails[] = [];

  // constructor(private service: FlightApiService) {}

  // public displayedColumns: string[] = [
  //   'flight_id',
  //   'plane_id',
  //   'plane_name',
  //   'departure_location',
  //   'arrival_location',
  //   'departure_date',
  //   'flight_time',
  //   'BSN_seats',
  //   'ECO_seats',
  //   'price',
  //   'edit',
  //   'delete',
  // ];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngOnInit(): void {
  //   // this.flightList$ = this.service.getFlightList();

  //   this.service.getFlightList().subscribe((data : FlightDetails[]) => {
  //     this.dataSource = new MatTableDataSource<FlightDetails>(data);
  //     // this.dataSource = data;
  //     this.dataSource.paginator = this.paginator;
  //     console.log(this.dataSource.data)
  //   });
  // }

  myClickFunction(event: any, id: any): void {
    alert(id);
    console.log(event);
  }
  // dataSource: any[] = [];
  dataSource = new MatTableDataSource<FlightDetails>(); 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // listFlight !: FlightDetails[];
  constructor(private service: FlightApiService) {
    // this.service.getFlightList().subscribe(x => {
    //   // this.dataSource.data = x;

    //   this.flightList = x;
    //   this.dataSource = new MatTableDataSource<FlightDetails>(this.flightList);
    //   console.log(this.dataSource.data)
    // })
    // this.getFlight();
    this.service.getFlightList().subscribe(data => {
      // this.flightList = data;
      // this.dataSource.data = this.flightList;
      // this.dataSource = new MatTableDataSource<FlightDetails>(this.flightList);
      // console.log(data);
      // console.log(this.flightList)
      // return data;
      // this.flightList = [...data];
      // angular.copy
      // console.log(data);
      // this.flightList.push(data);
      // console.log(this.flightList)
      // data.forEach(element => {
      //   this.flightList.push(element)
      // });

      data.forEach(element => {
        this.dataSource.data.push(element)
      });
      // console.log(this.dataSource.data)
      // console.log(this.flightList)
    })
  }
  ngOnInit(){
    this.dataSource = new MatTableDataSource<FlightDetails>();
    // this.getFlight();
    // this.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log(this.data)
    // this.dataSource = new MatTableDataSource<FlightDetails>(this.flightList);
    // console.log(this.flightList)
    // console.log(this.getFlight())
    // console.table(this.dataSource.data)
    // console.log(this.flightList)
    // console.log(this.dataSource.data)
  }

  getFlight() : any{
    this.service.getFlightList().subscribe(data => {
      // this.flightList = data;
      // this.dataSource.data = this.flightList;
      // this.dataSource = new MatTableDataSource<FlightDetails>(this.flightList);
      // console.log(data);
      // console.log(this.flightList)
      // return data;
      // this.flightList = [...data];
      // angular.copy
      // console.log(data);
      // this.flightList.push(data);
      // console.log(this.flightList)
      // data.forEach(element => {
      //   this.flightList.push(element)
      // });

      data.forEach(element => {
        this.dataSource.data.push(element)
      });
      // console.log(this.dataSource.data)
      // console.log(this.flightList)
    })
    // console.log(this.flightList)
  }
  
  // ngOnInit(){
  //   this.fetchFlight();
  // }
  
  // fetchFlight(){
  //   this.service.getFlightList().subscribe(data => {
  //     this.listFlight = data;
  //     this.dataSource = new MatTableDataSource(this.listFlight)
  //     console.log(this.listFlight)
  //     data.forEach(element => {
  //       this.dataSource.push(element)
  //     });
  //     // this.dataSource.paginator = this.paginator;
  //   })
  //   // this.service.getFlightList().forEach(element => {
  //   //   this.dataSource
  //   // });
  // }

  // public displayedColumns: string[] = [
  //   'flight_id',
  //   'plane_id',
  //   'plane_name',
  //   'departure_location',
  //   'arrival_location',
  //   'departure_date',
  //   'flight_time',
  //   'BSN_seats',
  //   'ECO_seats',
  //   'price',
  //   'edit',
  //   'delete',
  // ];
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data)
  }
}
