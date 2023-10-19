import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTicketManagementComponent } from './components/admin-ticket-management/admin-ticket-management.component';
import { AdminFlightManagementComponent } from './components/admin-flight-management/admin-flight-management.component';

const routes: Routes = [
  {path: 'admin-ticket-management', component: AdminTicketManagementComponent},
  {path: 'admin-flight-management', component: AdminFlightManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AdminTicketManagementComponent,
  AdminFlightManagementComponent
];
