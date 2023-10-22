import { Component, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

// const ELEMENT_DATA: PeriodicElement[] = [
//   {id_guest: '1', full_name: 'plane1', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   //Generate 10 more for ELEMENT_DATA
//   {id_guest: '2', full_name: 'plane2', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
//   {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
// ];
@Component({
  selector: 'app-guest-management',
  templateUrl: './guest-management.component.html',
  styleUrls: ['./guest-management.component.scss']
})
export class GuestManagementComponent {
  // displayedColumns: string[] = ['id_guest', 'full_name', 'gender', 'gmail', 'id_flight', 'id_ticket'];
  // dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['flight_id', 'plane_id', 
  'plane_name', 'departure_location', 'arrival_location', 'departure_date', 'flight_time', 'BSN_seats', 'ECO_seats', 
  'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource<FlightDetails>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


