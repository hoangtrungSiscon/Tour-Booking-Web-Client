import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import { BookingTicketDetailComponent } from './booking-ticket-detail/booking-ticket-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingComponent,
    BookingHistoryComponent,
    BookingTicketComponent,
    BookingTicketDetailComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    CanvasJSAngularChartsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatFormFieldModule,
    MatStepperModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class BookingModule { }
