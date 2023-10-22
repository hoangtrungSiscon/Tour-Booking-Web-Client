import { Component } from '@angular/core';
import { Time } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  id_guest: string;
  full_name: string;
  gender: string;
  gmail: string;
  id_flight: string;
  id_ticket: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id_guest: '1', full_name: 'plane1', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  //Generate 10 more for ELEMENT_DATA
  {id_guest: '2', full_name: 'plane2', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
  {id_guest: '3', full_name: 'plane3', gender: 'Boeing 737-800', gmail: 'Ho Chi Minh', id_flight: 'Singapore', id_ticket: '2022-10-01'},
];
@Component({
  selector: 'app-guest-management',
  templateUrl: './guest-management.component.html',
  styleUrls: ['./guest-management.component.scss']
})
export class GuestManagementComponent {
  displayedColumns: string[] = ['id_guest', 'full_name', 'gender', 'gmail', 'id_flight', 'id_ticket'];
  dataSource = ELEMENT_DATA;
}


