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
import { GuestManagementComponent } from './pages/guest-management/guest-management.component';
import { AdminNaviComponent } from './components/admin-navi/admin-navi.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { StatisticalComponent } from './pages/statistical/statistical.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { PieChartsComponent } from './components/pie-charts/pie-charts.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { LineChartsComponent } from './components/line-charts-eco/line-charts.component';
import { LineChartsBSNComponent } from './components/line-charts-bsn/line-charts-bsn.component';
import { ColumnChartsComponent } from './components/column-charts/column-charts.component';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    AdminNavigationComponent,
    AdminFlightManagementComponent,
    AdminTicketManagementComponent,
    routingComponents,
    AdminDashboardComponent,
    EditFlightComponent,
    AddFlightComponent,
    GuestManagementComponent,
    AdminNaviComponent,
    NewAccountComponent,
    StatisticalComponent,
    PieChartsComponent,
    LineChartsComponent,
    LineChartsBSNComponent,
    ColumnChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    CanvasJSAngularChartsModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }