import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { AdminFlightManagementComponent } from './pages/admin-flight-management/admin-flight-management.component';
import { AdminTicketManagementComponent } from './pages/admin-ticket-management/admin-ticket-management.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EditFlightComponent } from './pages/edit-flight/edit-flight.component';
import { AddFlightComponent } from './pages/add-flight/add-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavigationComponent,
    AdminFlightManagementComponent,
    AdminTicketManagementComponent,
    routingComponents,
    AdminDashboardComponent,
    EditFlightComponent,
    AddFlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
