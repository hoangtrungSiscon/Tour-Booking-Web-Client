import { Time } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  id_flight: string;
  id_plane: string;
  name_plane: string;
  departure_location: string;
  arrival_location: string;
  departure_date: string;
  flight_time: string;
  BSN_seats: number;
  ECO_seats: number;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id_flight: '1', id_plane: 'plane1', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00' , BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '2', id_plane: 'plane2', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '4', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '5', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '6', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '7', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '8', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '9', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '10', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '11', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '12', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '13', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh asdjla asdas asda d asdasdasd', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000000},
];

@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
})
export class AdminFlightManagementComponent {
  displayedColumns: string[] = ['id_flight', 'id_plane', 'name_plane', 'departure_location', 'arrival_location', 'departure_date', 'flight_time', 'BSN_seats', 'ECO_seats', 'price'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
