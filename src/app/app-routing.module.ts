import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTicketManagementComponent } from './pages/admin-ticket-management/admin-ticket-management.component';
import { AdminFlightManagementComponent } from './pages/admin-flight-management/admin-flight-management.component';
import { EditFlightComponent } from './pages/edit-flight/edit-flight.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddFlightComponent } from './pages/add-flight/add-flight.component';

const routes: Routes = [
  { path: 'admin-dashboard', children: [
    { path: 'admin-flight-management', component: AdminFlightManagementComponent },
    { path: 'admin-ticket-management', component: AdminTicketManagementComponent },
    { path: 'edit-flight', component: EditFlightComponent },
    { path: 'add-flight', component: AddFlightComponent}
  ]},
  // {path: 'admin-ticket-management', component: AdminTicketManagementComponent},
  // {path: 'admin-flight-management', component: AdminFlightManagementComponent},
  // {path: 'edit-flight', component: EditFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  // AdminDashboardComponent,
  AdminTicketManagementComponent,
  AdminFlightManagementComponent,
  EditFlightComponent,
  AddFlightComponent
];
