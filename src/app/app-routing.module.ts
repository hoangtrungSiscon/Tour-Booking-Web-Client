import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChangePassComponent} from './pages/change-pass/change-pass.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { BookingHistoryComponent } from './pages/booking-history/booking-history.component';


const routes: Routes = [
  {path: 'change-pass', component:ChangePassComponent},
  {path: 'view-profile', component:ViewProfileComponent},
  {path: 'booking-history', component:BookingHistoryComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
