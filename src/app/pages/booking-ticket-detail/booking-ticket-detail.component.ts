import { GetPlaneNameService } from './../../shared/services/get-plane-name.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChuyenBayService } from '../../shared/services/chuyenBay.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ChiTietVeService } from '../../shared/services/chiTietVe.service';
import { AuthService } from '../../shared/services/auth.service';
import { KhachHangService } from '../../shared/services/khachHang.service';
import { Meta, Title } from '@angular/platform-browser';
import { GetCountryService } from '../../shared/services/get-country.service';
import slugify from 'slugify';
import { DOCUMENT } from '@angular/common';
import { UrlReaderService } from 'src/app/shared/services/url-reader.service';

@Component({
  selector: 'app-booking-ticket-detail',
  templateUrl: './booking-ticket-detail.component.html',
  styleUrls: ['./booking-ticket-detail.component.scss'],
})
export class BookingTicketDetailComponent implements OnInit {
  flightInfo: any;
  imgKeyList = [
    { keyword: 'NHATBAN', fileName: 'japan.png' },
    { keyword: 'ANH', fileName: 'london.png' },
    { keyword: 'VIETNAM', fileName: 'vietnam.png' },
    { keyword: 'MY', fileName: 'usa.png' },
    { keyword: 'SINGAPORE', fileName: 'singapore.png' },
    { keyword: 'PHAP', fileName: 'paris.png' },
    { keyword: 'NGA', fileName: 'nga.png' },
    { keyword: 'HONGKONG', fileName: 'hongkong.png' },
    { keyword: 'HANQUOC', fileName: 'hanquoc.png' },
    { keyword: 'THAILAN', fileName: 'thailand.png' },
  ];
  // JP: 'Nhật Bản',
  // UK: 'Anh',
  // TH: 'Thái Lan',
  // VN: 'Việt Nam',
  // FR: 'Pháp',
  // RU: 'Nga',
  // SG: 'Singapore',
  // HK: 'Hồng Kông',
  // KR: 'Hàn Quốc',
  // US: 'Mỹ',
  imgKeyUrl = [
    { keyword: 'Nhật Bản', fileName: 'https://i.imgur.com/qtdmOJH.png' },
    { keyword: 'Anh', fileName: 'https://i.imgur.com/iiPFSWE.png' },
    { keyword: 'Việt Nam', fileName: 'https://i.imgur.com/ZOLPohm.png' },
    { keyword: 'Mỹ', fileName: 'https://i.imgur.com/fETT6bg.png' },
    { keyword: 'Singapore', fileName: 'https://i.imgur.com/vdq4nK4.png' },
    { keyword: 'Pháp', fileName: 'https://i.imgur.com/2fOCFSI.png' },
    { keyword: 'Nga', fileName: 'https://i.imgur.com/q744Z65.png' },
    { keyword: 'Hồng Kông', fileName: 'https://i.imgur.com/rcHqR4R.png' },
    { keyword: 'Hàn Quốc', fileName: 'https://i.imgur.com/Tfc5ukM.png' },
    { keyword: 'Mỹ', fileName: 'https://i.imgur.com/8SYJYFS.png' },
  ];
  //https://i.imgur.com/WaACbcs.png

  form: FormGroup | any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chuyenBayService: ChuyenBayService,
    private formBuilder: FormBuilder,
    private chiTietVeService: ChiTietVeService,
    private router: Router,
    private authService: AuthService,
    private khachHangService: KhachHangService,
    private meta: Meta,
    private title: Title,
    private getCountryService: GetCountryService,
    @Inject(DOCUMENT) private dom: Document,
    private urlReaderService: UrlReaderService,
    private getPlanenameService: GetPlaneNameService
  ) {}

  ngOnInit() {
    this.form = this.createForm();
    this.khachHangService
      .getByMaTaiKhoan(this.authService.thisAccountId())
      .subscribe((data) => {
        this.form.patchValue(data);
      });

    const slug = this.activatedRoute.snapshot.paramMap.get('slug');

    // const expectedSlug =
    this.loadTicketData(slug);
  }
  ImageUrl(keyword: string): string {
    const image = this.imgKeyList.find((img) => img.keyword === keyword);
    return image ? `../../../assets/img/${image.fileName}` : ``;
  }
  ImageUrlMeta(keyword: string): string {
    const image = this.imgKeyUrl.find((img) => img.keyword === keyword);
    return image ? image.fileName : ``;
  }
  

  loadTicketData(slug: string | null) {
    if (!slug) {
      this.router.navigate(['/booking-ticket']);
    } else {
      this.urlReaderService.generateFlightIdFromSlug(slug).then((flightId) => {
        console.log(flightId);
        this.chuyenBayService.getByCode(flightId).subscribe({
          next: (flight: any) => {
            this.flightInfo = flight;
          }, error: (err) => {
            this.router.navigate(['/booking-ticket']);
          }
        })
      });
    }
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

  updateMetaTagForBookingDetails(slug:string): void {
    if (this.flightInfo) {
      const origin = this.getCountryService.getCountryName(
        this.flightInfo?.chuyenBay.maChuyenBay.substring(6, 8)
      );
      const destination = this.getCountryService.getCountryName(
        this.flightInfo?.chuyenBay.maChuyenBay.substring(10, 12)
      );
      this.title.setTitle(
        `FlightDot - Chi tiết vé máy bay từ ${origin} đến ${destination}`
      );
      this.meta.updateTag({ name: 'keywords', content: 'Đặt vé máy bay qua flightdot, FlightDot, flightdot booking, flightdot azure, minhkhanh, hoangtrung, flight.' });
      this.meta.updateTag({ name: 'description', content: `Website đặt vé máy bay - Chuyến bay từ ${origin} đến ${destination} hiện tại.` });
      this.meta.updateTag({ property: 'og:url', content: `https://flightdotclient.azurewebsites.net/booking-ticket/${slug}` });
      this.meta.updateTag({ property: 'og:title', content: `FlightDot - Chi tiết vé máy bay từ ${origin} đến ${destination}` });
      this.meta.updateTag({ property: 'og:description', content: `Website đặt vé máy bay - Chuyến bay từ ${origin} đến ${destination} hiện tại.` });
      this.meta.updateTag({ property: 'og:image', content:  this.ImageUrlMeta(destination)});
      // this.meta.updateTag({ name: 'canonical', content: `https://flightdotclient.azurewebsites.net/booking-ticket/${slug}` });
      const currentURL = 'https://flightdotclient.azurewebsites.net/booking-ticket-detail';
      this.updateCanonicalUrl(currentURL)
    }
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

  createForm() {
    let form: FormGroup | any = this.formBuilder.group({
      maVe: [0],
      maChuyenBay: [''],
      maTaiKhoan: [0],
      tenKh: [''],
      soLuong: [
        0,
        [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)],
      ],
      gmailKh: [''],
      tongGia: [0],
      sdt: [''],
      ngayDatVe: [new Date().toLocaleString()],
      phai: [''],
      loaiVe: ['', Validators.required],
      tinhTrang: ['', Validators.required],
    });
    let soLuong = form.get('soLuong');
    let tongGia = form.get('tongGia');
    let loaiVe = form.get('loaiVe');
    soLuong?.valueChanges.pipe(debounceTime(300)).subscribe((newData: any) => {
      tongGia?.setValue(
        newData *
          this.flightInfo?.chuyenBay.donGia *
          (this.form.value.loaiVe === 'BSN' ? 3 : 1),
        {
          emitEvent: false,
        }
      );
    });

    loaiVe?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      tongGia?.setValue(
        this.flightInfo?.chuyenBay.donGia *
          (this.form.value.loaiVe === 'BSN' ? 3 : 1),
        {
          emitEvent: false,
        }
      );
    });

    return form;
  }
  changeType(type: string) {
    this.form.get('loaiVe').setValue(type);
  }

  showOnInit() {
    if (this.form.value.soLuong == '' || this.form.value.loaiVe == '') {
      Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin', 'error');
    } else {
      this.form
        .get('maChuyenBay')
        .setValue(this.flightInfo?.chuyenBay.maChuyenBay);
      console.log(this.form.value);
      this.chiTietVeService.create(this.form.value).subscribe(
        () => {
          Swal.fire({
            title: 'Bạn đã đặt vé thành công',
            text: 'Quý khánh hãy thực hiện thủ tục thanh toán trong thời gian sớm nhất qua ví điện tử hoặc thanh toán trực tiếp tại quầy thu ngân. Chúng tôi rất hân hạnh được phục vụ quý khách và chúc quý khách có một chuyến đi thật tuyệt vời.',
            icon: 'success',
            confirmButtonText: 'Thanh toán ngay',
            showDenyButton: true,
            denyButtonText: 'Để sau',
            denyButtonColor: '#aaa',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/invoices']);
            } else if (result.isDenied) {
              this.router.navigate(['/booking-ticket']);
            }
          });
        },
        (error) => {
          if (this.form.get('loaiVe').value == 'BSN') {
            Swal.fire(
              'Lỗi đặt vé',
              'Có vẻ quý khách đã đặt số lượng ghế BSN nhiều hơn so với số lượng ghế BSN hiện đang còn trống. Chúng tôi rất lấy làm tiếc. Xin quý khách vui lòng thử lại',
              'error'
            );
          } else {
            Swal.fire(
              'Lỗi đặt vé',
              'Có vẻ quý khách đã đặt số lượng ghế ECO nhiều hơn so với số lượng ghế ECO hiện đang còn trống. Chúng tôi rất lấy làm tiếc. Xin quý khách vui lòng thử lại',
              'error'
            );
          }
        }
      );
    }
  }
  isLoggedIn(): boolean {
    return this.authService.isUser();
  }
  toLogin() {
    this.authService.setLoginSuccessRedirect();
    this.router.navigate(['/login']);
  }
}
