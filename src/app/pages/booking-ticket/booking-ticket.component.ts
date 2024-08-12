import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChuyenBayService } from '../../shared/services/chuyenBay.service';
import { Router } from '@angular/router';
import { CookieService } from '../../shared/services/cookie.service';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as $ from 'jquery';
import { Meta, Title } from '@angular/platform-browser';
import { GetCountryService } from 'src/app/shared/services/get-country.service';
import slugify from 'slugify';
import { DOCUMENT } from '@angular/common';
import { UrlReaderService } from 'src/app/shared/services/url-reader.service';
export interface submitForm {
  fromPlace: string;
  toPlace: string;
  startDate: string;
  id: string;
}
@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.scss'],
})
export class BookingTicketComponent {
  public isAccessible: boolean = false;
  form: FormGroup | any;
  fromPlace: string[] = [
    'VIETNAM',
    'THAILAN',
    'ANH',
    'NHATBAN',
    'HANQUOC',
    'MY',
    'PHAP',
    'NGA',
    'SINGAPORE',
    'HONGKONG',
  ];
  toPlace: string[] = [
    'VIETNAM',
    'THAILAN',
    'ANH',
    'NHATBAN',
    'HANQUOC',
    'MY',
    'PHAP',
    'NGA',
    'SINGAPORE',
    'HONGKONG',
  ];
  tickets: any[] = [];
  textError: string = '';
  inputStartDate: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private chuyenBayService: ChuyenBayService,
    private router: Router,
    private cookieService: CookieService,
    private transferDataService: TransferDataService,
    private authService: AuthService,
    private meta: Meta,
    private title: Title,
    private getCountryService: GetCountryService,
    @Inject(DOCUMENT) private dom: Document,
    private urlReaderService: UrlReaderService
  ) {}
  data = this.transferDataService.getData();
  SubmitForm: submitForm = {
    fromPlace: '',
    toPlace: '',
    startDate: '',
    id: '',
  };
  ngOnInit() {
    $(document).ready(function(){
      $('#resetButton').click(function(){
        $('.btn-check').prop('checked',false);
        $('#inputstartdate').val(Date.now.toString())
        
      })
    })
    if (!this.authService.isAdmin()){
      this.isAccessible = true
    }
    if (this.data){
      this.SubmitForm.fromPlace = this.data.origin;
      this.SubmitForm.toPlace = this.data.destination;
      this.SubmitForm.startDate = this.data.date;
      this.SubmitForm.id = ''
      this.chuyenBayService
      .filterChuyenBay(this.SubmitForm)
      .subscribe((data) => (this.tickets = data));
      this.transferDataService.clearData();
    }
    this.form = this.createForm();
    this.chuyenBayService.getAll().subscribe((data) => (this.tickets = data));
    console.log(this.data)
    this.setMetaForBookingPage();
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
  setMetaForBookingPage() : void {
    // Cập nhật tiêu đề
    this.title.setTitle('FlightDot - Thông tin các chuyến bay hiện tại đang có');
    
    // Thêm các thẻ meta mới
    this.meta.updateTag({ name: 'keywords', content: 'Đặt vé máy bay qua flightdot, FlightDot, flightdot booking, flightdot azure, minhkhanh, hoangtrung, flight.' });
    this.meta.updateTag({ name: 'description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://flightdotclient.azurewebsites.net/booking-ticket' });
    this.meta.updateTag({ property: 'og:title', content: 'FlightDot - Thông tin các chuyến bay hiện tại đang có' });
    this.meta.updateTag({ property: 'og:description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://i.imgur.com/WaACbcs.png' });    
    this.meta.updateTag({ name: 'canonical', content: 'https://flightdotclient.azurewebsites.net/booking-ticket' });
    const currentURL = 'https://flightdotclient.azurewebsites.net/booking-ticket';
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
  ngOnDestroy() {}

  createForm() {
    return this.formBuilder.group({
      fromPlace: this.formBuilder.control(['']),
      toPlace: this.formBuilder.control(['']),
      startDate: this.formBuilder.control(['']),
      id: this.formBuilder.control(['']),
    });
  }
  selectedFromPlace: string | null = null;
  inputFromPlace(place: string) {
    this.form.get('fromPlace').setValue(place);
    this.SubmitForm.fromPlace = place;
  }
  inputToPlace(place: string) {
    this.form.get('toPlace').setValue(place);
    this.SubmitForm.toPlace = place;
  }

  onSubmit() {  
    this.SubmitForm.startDate = this.inputStartDate
    console.log(this.SubmitForm)
    this.chuyenBayService
      .filterChuyenBay(this.SubmitForm)
      .subscribe((data) => (this.tickets = data));
  }

  checkLogin(ma: string, bsn: number, eco: number) {
    this.navigateToDetailPage(ma);
  }
  // navigateToDetailPage(id: string) {
  //   const slug = this.urlReaderService.generateSlugFromFlightId(id);
  //   console.log(slug)
  //   // this.router.navigate([`/booking-ticket-detail`, slug]);
  // }
  navigateToDetailPage(id: string) {
    this.urlReaderService.generateSlugFromFlightId(id)
      .then((slug) => {
        console.log(slug);
        this.router.navigate([`/booking-ticket-detail`, slug]);
      })
      .catch((error) => {
        console.error('Error generating slug:', error);
      });
  }
  
  reloadValue() {
    this.SubmitForm.fromPlace = '';
    this.SubmitForm.toPlace = '';
    this.SubmitForm.startDate = '';
    this.SubmitForm.id = '';
    this.form = this.createForm();
    this.chuyenBayService.getAll().subscribe((data) => (this.tickets = data));
  }
}
