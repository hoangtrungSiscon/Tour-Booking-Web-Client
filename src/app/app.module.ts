import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { AdminFlightManagementComponent } from './pages/admin-flight-management/admin-flight-management.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavigationComponent,
    AdminFlightManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
    // AdminFlightManagementComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
