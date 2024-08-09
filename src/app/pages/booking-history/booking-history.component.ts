import { Component, Inject } from '@angular/core';
import { TicketHistoryApiService } from 'src/app/shared/services/ticket-history-api.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { da } from 'date-fns/locale';
import { Title,Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
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
    private title:Title,
    private meta:Meta,
    @Inject(DOCUMENT) private dom: Document

  ){}
  async ngOnInit(){
    if (!this.authService.isUser()){
      this.router.navigate(['/login']);
    }
    this.tickethistoryapi.getTicketHistoryList(this.authService.thisAccountId()).subscribe((data) =>{
      this.tickets = data
    })
    this.title.setTitle("FlightDot - Lịch sử đặt vé")
    const currentURL = 'https://flightdotclient.azurewebsites.net/booking-history';
    this.updateCanonicalUrl(currentURL)
  }
  updateCanonicalUrl(url:string){
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement= this.dom.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
    if (element==null) {
      element= this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel','canonical')
    element.setAttribute('href',url)
  }
}
