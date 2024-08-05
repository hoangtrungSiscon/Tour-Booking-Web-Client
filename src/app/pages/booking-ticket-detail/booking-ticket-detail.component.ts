import { Component, Input, OnInit } from '@angular/core';
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
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
  public payPalConfig?: IPayPalConfig;

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
    private getCountryService: GetCountryService
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
    this.updateMetaTags();
    this.initConfig();
  }
  ImageUrl(keyword: string): string {
    const image = this.imgKeyList.find((img) => img.keyword === keyword);
    return image ? `../../../assets/img/${image.fileName}` : ``;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'ASzbDbw5YCZBXa_XcOuIHQNW_nMUKuem-c6xdgprJ77xRKLAr8DcXLQVHPnSeinenvQu7wLND9mNtaM8',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },

      onClick: (data, actions) => {
        console.log('onClick', data, actions);

        this.form
          .get('maChuyenBay')
          .setValue(this.flightInfo?.chuyenBay.maChuyenBay);

        console.log(this.form.value);
        return this.chiTietVeService
          .checkValidity(this.form.value)
          .toPromise()
          .then((response) => {
            console.log('Order is valid', response);
            return actions.resolve();
          })
          .catch((error) => {
            console.error('Order is invalid', error);
            alert('Đơn hàng không hợp lệ!');
            return actions.reject();
          });
      },
    };
  }

  loadTicketData(slug: string | null): void {
    if (!slug) {
      this.router.navigate(['/booking-ticket']);
    } else {
      const flightId = slug.split('-')[6];
      this.chuyenBayService.getByCode(flightId).subscribe({
        next: (flight: any) => {
          this.flightInfo = flight;
          //verify slug
          const origin = slugify(
            this.getCountryService.getCountryName(flightId.substring(6, 8)),
            { lower: true }
          );
          const destination = slugify(
            this.getCountryService.getCountryName(flightId.substring(10, 12)),
            { lower: true }
          );
          const expectedSlug = `thong-tin-chi-tiet-chuyen-bay-${flightId}-tu-${origin}-den-${destination}`;
          if (slug !== expectedSlug) {
            this.router.navigate([`/booking-ticket-detail`, expectedSlug], {
              replaceUrl: true,
            });
          }
        },
        error: (err) => {
          this.router.navigate(['/booking-ticket']);
        },
      });
    }
  }
  // <meta property="og:title" content="FlightDot - Đặt vé máy bay">
  // <meta property="og:description" content="Website đặt vé máy bay FlightDot">
  // <meta property="og:image" content="src\assets\icons8-plane-48.png">
  // <meta property="og:alt" content="hình ảnh">
  // <meta property="og:url" content="">
  // <meta property="og:type" content="website">
  // <meta property="keywords" content="angular, SEO flightdot, flightdot, tmdt flightdot">

  updateMetaTags() {
    if (this.flightInfo) {
      const origin = this.getCountryService.getCountryName(
        this.flightInfo?.chuyenBay.maChuyenBay.substring(6, 8)
      );
      const destination = this.getCountryService.getCountryName(
        this.flightInfo?.chuyenBay.maChuyenBay.substring(10, 12)
      );
      this.title.setTitle(
        `Chi tiết vé máy bay từ ${origin} đến ${destination}`
      );
      this.meta.updateTag({
        property: 'og:title',
        content: `Chi tiết vé máy bay từ ${origin} đến ${destination}`,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: this.ImageUrl(this.flightInfo?.chuyenBay.noiXuatPhat),
      });
      this.meta.updateTag({ property: 'og:image:width', content: '60' });
      this.meta.updateTag({ property: 'og:image:height', content: '60' });
      this.meta.updateTag({
        property: 'og:image:alt',
        content: `Hình ảnh nơi đến: ${this.flightInfo?.chuyenBay.noiXuatPhat}`,
      });

      this.meta.updateTag({
        property: 'og:description',
        content: 'Your new Open Graph description here.',
      });

      this.meta.updateTag({
        property: 'og:description',
        content: `Thông tin chi tiết vé cho chuyến bay ${this.flightInfo?.chuyenBay.maChuyenBay} từ ${this.flightInfo?.chuyenBay.noiXuatPhat} đến ${this.flightInfo?.chuyenBay.noiDen}.`,
      });
      this.meta.updateTag({
        name: 'keywords',
        content: `vé máy bay, ${this.flightInfo?.chuyenBay.noiXuatPhat}, ${this.flightInfo?.chuyenBay.noiDen}, ${this.flightInfo.MaChuyenBay}, đặt vé, du lịch, flightdot`,
      });
    }
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
