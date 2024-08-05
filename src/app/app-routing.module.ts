import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTicketManagementComponent } from './pages/admin-ticket-management/admin-ticket-management.component';
import { AdminFlightManagementComponent } from './pages/admin-flight-management/admin-flight-management.component';
import { EditFlightComponent } from './pages/edit-flight/edit-flight.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddFlightComponent } from './pages/add-flight/add-flight.component';
import { GuestManagementComponent } from './pages/guest-management/guest-management.component';
// import { AdminNaviComponent } from './components/admin-navi/admin-navi.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { StatisticalComponent } from './pages/statistical/statistical.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { BookingHistoryComponent } from './pages/booking-history/booking-history.component';
import { BookingTicketComponent } from './pages/booking-ticket/booking-ticket.component';
import { BookingTicketDetailComponent } from './pages/booking-ticket-detail/booking-ticket-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { PaymentResultComponent } from './pages/payment-result/payment-result.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    children: [
      {
        path: 'admin-flight-management',
        component: AdminFlightManagementComponent,
      },
      {
        path: 'admin-ticket-management',
        component: AdminTicketManagementComponent,
      },
      { path: 'edit-flight/:id', component: EditFlightComponent },
      { path: 'add-flight', component: AddFlightComponent },
      { path: 'guest-management', component: GuestManagementComponent },
      { path: 'statist', component: StatisticalComponent },
      { path: '', redirectTo: 'admin-flight-management', pathMatch: 'full' },
      { path: 'guest-management/new-account', component: NewAccountComponent },
    ],
    component: AdminDashboardComponent,
  },

  { path: 'new-account', component: NewAccountComponent },

  {
    path: 'admin-dashboard/guest-management/new-account/:id',
    component: NewAccountComponent,
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-pass', component: ForgetPassComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'change-pass', component: ChangePassComponent },
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'booking-history', component: BookingHistoryComponent },
  { path: 'booking-ticket', component: BookingTicketComponent },
  {
    path: 'booking-ticket-detail/:slug',
    component: BookingTicketDetailComponent,
  },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoice-detail/:id/:slug', component: InvoiceDetailComponent },
  { path: 'payment-result/:id', component: PaymentResultComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
