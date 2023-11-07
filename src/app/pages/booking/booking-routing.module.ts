import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import { BookingTicketDetailComponent } from './booking-ticket-detail/booking-ticket-detail.component';

const routes: Routes = [{
  path: '', children: [
    { path: 'booking-history', component: BookingHistoryComponent },
    { path: 'booking-ticket', component: BookingTicketComponent },
    { path: 'booking-ticket-detail', component: BookingTicketDetailComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
