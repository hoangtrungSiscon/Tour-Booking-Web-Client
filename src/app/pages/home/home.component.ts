import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as $ from 'jquery';
import { NewestFlightService } from 'src/app/shared/services/newest-flight.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public date : any = "";
  public departure : any = "";
  public destination : any = "";
  public newestflights: any[] = [];
  constructor(private router: Router, private transferDataService: TransferDataService, private authService: AuthService, private newestflight: NewestFlightService, private meta: Meta,private title: Title,) {


  }

  async ngOnInit(){
    this.newestflight.getTop3NewestFlight().subscribe((data)=>this.newestflights=data)
    this.setMetaForHomePage();
  }
  setMetaForHomePage() {
    this.title.setTitle(`Đặt vé máy bay - Thực hiện ước mơ cùng Flight Dot`);
    this.meta.updateTag({ property: 'og:image', content: 'assets/img/background2.jpeg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1000' });
    this.meta.updateTag({ property: 'og:image:height', content: '530' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Hình ảnh trang chủ' });
    this.meta.updateTag({ name: 'description', content: 'Thông tin trang chủ đặt vé máy bay trực tuyến - Flight Dot' });
    this.meta.updateTag({ name: 'keywords', content: `vé máy bay, FlightDot, đặt vé, du lịch` });
  }
  searchFlight() {
    let data = {
      date: this.date,
      origin: this.departure,
      destination: this.destination
    }
    console.log(data)
    this.transferDataService.setData(data)
    this.router.navigate(['/booking-ticket']);
  }
}