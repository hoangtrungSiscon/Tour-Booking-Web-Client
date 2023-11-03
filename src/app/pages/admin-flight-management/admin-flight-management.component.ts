import { Time } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface FlightDetails {
  flight_id: string;
  plane_id: string;
  plane_name: string;
  departure_location: string;
  arrival_location: string;
  departure_date: string;
  flight_time: string;
  BSN_seats: number;
  ECO_seats: number;
  price: number;
}

const ELEMENT_DATA: FlightDetails[] = [
  {flight_id: '1', plane_id: 'plane1', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00' , BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '2', plane_id: 'plane2', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '3', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '4', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '5', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '6', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '7', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '8', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '9', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '10', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '11', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '12', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {flight_id: '13', plane_id: 'plane3', plane_name: 'Boeing 737-800', departure_location: 'Ho Chi Minh asdjla asdas asda d asdasdasd', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000000},
];

@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
})
export class AdminFlightManagementComponent {
  displayedColumns: string[] = ['flight_id', 'plane_id', 
  'plane_name', 'departure_location', 'arrival_location', 'departure_date', 'flight_time', 'BSN_seats', 'ECO_seats', 
  'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource<FlightDetails>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data)
  }
}
