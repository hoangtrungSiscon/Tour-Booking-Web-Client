import { Component } from '@angular/core';
import { TicketHistoryApiService } from 'src/app/shared/services/ticket-history-api.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { da } from 'date-fns/locale';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent {
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  public tickets: any[] = [];
  constructor(
    private tickethistoryapi:TicketHistoryApiService,
    private authService:AuthService,
    private router :Router,
    private title:Title
  ){}
  async ngOnInit(){
    if (!this.authService.isUser()){
      this.router.navigate(['/login']);
    }
    this.tickethistoryapi.getTicketHistoryList(this.authService.thisAccountId()).subscribe((data) =>{
      this.tickets = data
    })
    this.title.setTitle("FlightDot - Lịch sử đặt vé")
  }
}
