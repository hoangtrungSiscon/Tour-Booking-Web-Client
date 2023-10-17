import { Time } from '@angular/common';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

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
  //Generate 10 more for ELEMENT_DATA
  {id_flight: '2', id_plane: 'plane2', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
  {id_flight: '3', id_plane: 'plane3', name_plane: 'Boeing 737-800', departure_location: 'Ho Chi Minh', arrival_location: 'Singapore', departure_date: '2022-10-01', flight_time: '12:00', BSN_seats: 100, ECO_seats: 100, price: 100000},
];

// /**
//  * @title Styling columns using their auto-generated column names
//  */


@Component({
  selector: 'app-admin-flight-management',
  templateUrl: './admin-flight-management.component.html',
  styleUrls: ['./admin-flight-management.component.scss'],
  // standalone: true,
  // imports: [MatTableModule],
})
export class AdminFlightManagementComponent {
  displayedColumns: string[] = ['id_flight', 'id_plane', 'name_plane', 'departure_location', 'arrival_location', 'departure_date', 'flight_time', 'BSN_seats', 'ECO_seats', 'price'];
  dataSource = ELEMENT_DATA;
}
