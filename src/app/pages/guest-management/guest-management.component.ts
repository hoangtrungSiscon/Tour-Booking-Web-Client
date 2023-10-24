import { Component, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  id_guest: string;
  full_name: string;
  gender: string;
  gmail: string;
  id_flight: string;
  id_ticket: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id_guest: '1', full_name: 'Anh A', gender: 'Nam', gmail: 'A@gmail.com', id_flight: '1', id_ticket: '01'},
  //Generate 10 more for ELEMENT_DATA
  {id_guest: '2', full_name: 'Anh B', gender: 'Nam', gmail: 'B@gmail.com', id_flight: '2', id_ticket: '02'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},

  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
  {id_guest: '3', full_name: 'Co C', gender: 'Nữ', gmail: 'C@gmail.com', id_flight: '3', id_ticket: '03'},
];

@Component({
  selector: 'app-guest-management',
  templateUrl: './guest-management.component.html',
  styleUrls: ['./guest-management.component.scss']
})
export class GuestManagementComponent {
  displayedColumns: string[] = ['id_guest', 'full_name', 'gender', 'gmail', 'id_flight', 'id_ticket'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


