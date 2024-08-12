import { Component, Inject } from '@angular/core';
import {ActivatedRoute, Router,NavigationEnd  } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as $ from 'jquery';
import { NewestFlightService } from 'src/app/shared/services/newest-flight.service';
import { Meta, Title } from '@angular/platform-browser';
import { MailchimpService } from 'src/app/shared/services/mailchimp.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

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
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    private router: Router,
    private transferDataService: TransferDataService,
    private authService: AuthService,
    private newestflight: NewestFlightService,
    private meta: Meta,
    private title: Title,
    private mailchimpService: MailchimpService,
    private http: HttpClient,
    private route:ActivatedRoute,
    @Inject(DOCUMENT) private dom: Document
  ) {}

  AddEmail() {
    this.mailchimpService.subscribe(this.email).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công <3',
          text: 'Đã đăng kí thành công',
        });
      },
      error => {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Đăng kí thất bại. Vui lòng thử lại sau',
        });
      }
    );
  }
  

  async ngOnInit() {
    this.setMetaForHomePage();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setMetaForHomePage();
    });
    this.newestflight
      .getTop3NewestFlight()
      .subscribe((data) => (this.newestflights = data));
  }
  
  removeUnwantedMetaTags(): void {
    // Lấy tất cả các thẻ meta
    const metaTags = document.getElementsByTagName('meta');
    
    // Duyệt qua tất cả các thẻ meta và xóa những thẻ không mong muốn
    for (let i = metaTags.length - 1; i >= 0; i--) {
      const metaTag = metaTags[i];
      const name = metaTag.getAttribute('name');
      const property = metaTag.getAttribute('property');
      
      // Giữ lại các thẻ cụ thể
      if (name === 'google-site-verification' || name === 'viewport' || name === 'charset') {
        continue;
      }

      // Xóa các thẻ meta không mong muốn
      metaTag.parentNode?.removeChild(metaTag);
    }
  }
  setMetaForHomePage() : void {
    // Cập nhật tiêu đề
    this.title.setTitle('FlightDot - Đặt Vé Máy Bay Online - Nhanh Chóng, Tiện Lợi, Giá Tốt');
    
    // Thêm các thẻ meta mới
    this.meta.updateTag({ name: 'keywords', content: 'Đặt vé máy bay qua flightdot, FlightDot, flightdot booking, flightdot azure, minhkhanh, hoangtrung, flight.' });
    this.meta.updateTag({ name: 'description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://flightdotclient.azurewebsites.net/home' });
    this.meta.updateTag({ property: 'og:title', content: 'FlightDot - Đặt Vé Máy Bay Online - Nhanh Chóng, Tiện Lợi, Giá Tốt' });
    this.meta.updateTag({ property: 'og:description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://i.imgur.com/WaACbcs.png' });    
    this.meta.updateTag({ name: 'canonical', content: 'https://flightdotclient.azurewebsites.net/home' });
    const currentURL = 'https://flightdotclient.azurewebsites.net/home';
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
