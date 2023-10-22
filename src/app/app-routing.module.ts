import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTicketManagementComponent } from './pages/admin-ticket-management/admin-ticket-management.component';
import { AdminFlightManagementComponent } from './pages/admin-flight-management/admin-flight-management.component';
import { EditFlightComponent } from './pages/edit-flight/edit-flight.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddFlightComponent } from './pages/add-flight/add-flight.component';
import { GuestManagementComponent } from './pages/guest-management/guest-management.component';
import { AdminNaviComponent } from './components/admin-navi/admin-navi.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { StatisticalComponent } from './pages/statistical/statistical.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
const routes: Routes = [
  { path: 'admin-dashboard', children: [
    { path: 'admin-flight-management', component: AdminFlightManagementComponent },
    { path: 'admin-ticket-management', component: AdminTicketManagementComponent },
    { path: 'edit-flight', component: EditFlightComponent },
    { path: 'add-flight', component: AddFlightComponent},
    {path: 'guest-management', component: GuestManagementComponent},
    {path: 'statist',component: StatisticalComponent},
    
  ],component: AdminDashboardComponent},
  {path: 'admin-navi', component: AdminNaviComponent},
  
  {path: 'new-account',component: NewAccountComponent},
  
  {path: 'guest-management/new-account',component: NewAccountComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forget-pass', component: ForgetPassComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: '', redirectTo: '/home' , pathMatch: 'full'}
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
