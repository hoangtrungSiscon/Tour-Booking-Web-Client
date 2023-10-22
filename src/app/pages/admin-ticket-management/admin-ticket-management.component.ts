import { Time } from '@angular/common';
import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface TicketDetails {
  ticket_id: string;
  booking_date: string;
  customer_id: string;
  customer_name: string;
  flight_id: string;
  seat_type: string;
  quantity: number;
  price: number;
}

const ELEMENT_DATA: TicketDetails[] = [
  {ticket_id: '1', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '2', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '3', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '4', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '5', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '6', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '7', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '8', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '9', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '10', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '11', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '12', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},
  {ticket_id: '13', booking_date: '2022-10-01', customer_id: '1', customer_name: 'Nguyen Van A', flight_id: '1', seat_type: 'ECO', quantity: 1, price: 100},

];

@Component({
  selector: 'app-admin-ticket-management',
  templateUrl: './admin-ticket-management.component.html',
  styleUrls: ['./admin-ticket-management.component.scss']
})
export class AdminTicketManagementComponent {
  displayedColumns: string[] = [
    'ticket_id',
    'booking_date',
    'customer_id',
    'customer_name',
    'flight_id',
    'seat_type',
    'quantity',
    'price',
    'approve',
    'cancel', 
    'delete'
  ];
  dataSource = new MatTableDataSource<TicketDetails>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
