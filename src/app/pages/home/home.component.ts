import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as $ from 'jquery';
import { NewestFlightService } from 'src/app/shared/services/newest-flight.service';
import { Meta, Title } from '@angular/platform-browser';
import { MailchimpService } from 'src/app/shared/services/mailchimp.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  email: string = '';
  public date: any = '';
  public departure: any = '';
  public destination: any = '';
  public newestflights: any[] = [];
  private apiKey = '87fef4d87cd58971310ba6b22cf1ffdd-us22';    

  constructor(
    private router: Router,
    private transferDataService: TransferDataService,
    private authService: AuthService,
    private newestflight: NewestFlightService,
    private meta: Meta,
    private title: Title,
    private mailchimpService: MailchimpService,
    private http: HttpClient,
  ) {}

  AddEmail() {
    
    const apiUrl = `mailchimpapi/3.0/lists/1d043ea14e/members`;
    const data = {
      email_address: this.email,
      status: 'subscribed'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('anystring:' + this.apiKey)}`,
      'Access-Control-Allow-Origin': '*'
    });

    this.http.post(apiUrl, data, { headers }).subscribe(
      response => {
        console.log('Subscription successful', response);
      },
      error => {
        console.error('Subscription error', error);
      }
    );
  }

  async ngOnInit() {
    this.newestflight
      .getTop3NewestFlight()
      .subscribe((data) => (this.newestflights = data));
    this.setMetaForHomePage();
  }
  setMetaForHomePage() {
    this.title.setTitle(`Đặt vé máy bay - Thực hiện ước mơ cùng Flight Dot`);
    this.meta.updateTag({
      property: 'og:image',
      content: 'assets/img/background2.jpeg',
    });
    this.meta.updateTag({ property: 'og:image:width', content: '1000' });
    this.meta.updateTag({ property: 'og:image:height', content: '530' });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: 'Hình ảnh trang chủ',
    });
    this.meta.updateTag({
      name: 'description',
      content: 'Thông tin trang chủ đặt vé máy bay trực tuyến - Flight Dot',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: `vé máy bay, FlightDot, đặt vé, du lịch`,
    });
  }
  searchFlight() {
    let data = {
      date: this.date,
      origin: this.departure,
      destination: this.destination,
    };
    console.log(data);
    this.transferDataService.setData(data);
    this.router.navigate(['/booking-ticket']);
  }
}
