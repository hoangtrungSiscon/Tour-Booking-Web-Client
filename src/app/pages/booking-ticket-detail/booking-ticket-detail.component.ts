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
    this.khachHangService.getByMaTaiKhoan(this.authService.thisAccountId()).subscribe((data)=>{
      this.form.patchValue(data);
    })

    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    
    // const expectedSlug = 
    this.loadTicketData(slug);

  }
  ImageUrl(keyword: string): string {
    const image = this.imgKeyList.find(img => img.keyword === keyword);
    return image ? `../../../assets/img/${image.fileName}` : ``;
  }
  loadTicketData(slug: string | null): void {
    if (!slug) {
      this.router.navigate(['/booking-ticket']);
    } else {
      const flightId = slug.split('-')[6];
      this.chuyenBayService
      .getByCode(flightId)
      .subscribe({next: (flight: any) => {
        this.flightInfo = flight;
        this.updateMetaTags();
        //verify slug
        const origin = slugify(this.getCountryService.getCountryName(flightId.substring(6, 8)), { lower: true });
        const destination = slugify(this.getCountryService.getCountryName(flightId.substring(10, 12)), { lower: true });
        const expectedSlug = `thong-tin-chi-tiet-chuyen-bay-${flightId}-tu-${origin}-den-${destination}`;
        if (slug !== expectedSlug) {
          this.router.navigate([`/booking-ticket-detail`, expectedSlug], { replaceUrl: true });
        }
      }, error: (err) => {
        this.router.navigate(['/booking-ticket']);
      }});
    }
  }


  updateMetaTags(): void {
    if (this.flightInfo) {
      const origin = this.getCountryService.getCountryName(this.flightInfo?.chuyenBay.maChuyenBay.substring(6, 8));
      const destination = this.getCountryService.getCountryName(this.flightInfo?.chuyenBay.maChuyenBay.substring(10, 12));
      this.title.setTitle(`Chi tiết vé máy bay từ ${origin} đến ${destination}`);
      this.meta.addTag({ property: 'og:image', content: this.ImageUrl(this.flightInfo?.chuyenBay.noiXuatPhat) });
      this.meta.addTag({ property: 'og:image:width', content: '1000' });
      this.meta.addTag({ property: 'og:image:height', content: '530' });
      this.meta.addTag({ property: 'og:image:alt', content: `Hình ảnh nơi đến: ${this.flightInfo?.chuyenBay.noiXuatPhat}` });
      this.meta.addTag({ name: 'description', content: `Thông tin chi tiết vé cho chuyến bay ${this.flightInfo?.chuyenBay.maChuyenBay} từ ${this.flightInfo?.chuyenBay.noiXuatPhat} đến ${this.flightInfo?.chuyenBay.noiDen}.` });
      this.meta.addTag({ name: 'keywords', content: `vé máy bay, ${this.flightInfo?.chuyenBay.noiXuatPhat}, ${this.flightInfo?.chuyenBay.noiDen}, ${this.flightInfo.MaChuyenBay}, đặt vé, du lịch` });
    }
  }


  createForm() {
    let form: FormGroup | any = this.formBuilder.group({
      maVe: [0],
      maChuyenBay: [''],
      maTaiKhoan: [0],
      tenKh: [''],
      soLuong: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
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
    soLuong?.valueChanges.pipe(debounceTime(300)).subscribe((newData: any) => {
      tongGia?.setValue(newData * this.flightInfo?.chuyenBay.donGia, {
        emitEvent: false,
      });
    });

    return form;
  }
  changeType(type: string) {
    this.form.get('loaiVe').setValue(type);
  }

  showOnInit() {
    if (this.form.value.soLuong == '' || this.form.value.loaiVe == '') {
      Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin', 'error');
    }
    else {
      this.form
      .get('maChuyenBay')
      .setValue(this.flightInfo?.chuyenBay.maChuyenBay);
      console.log(this.form.value);
      this.chiTietVeService.create(this.form.value).subscribe(
      () => {
        Swal.fire(
          'Bạn đã đặt vé thành công',
          'Chúng tôi rất hân hạnh được phục vụ quý khách và chúc quý khách có một chuyến đi thật tuyệt vời.',
          'success'
        ).then(() => {
          this.router.navigate(['/booking-ticket']);
        });
      },
      (error) => {

        if (this.form.get('loaiVe').value == "BSN"){
          Swal.fire('Lỗi đặt vé', 'Có vẻ quý khách đã đặt số lượng ghế BSN nhiều hơn so với số lượng ghế BSN hiện đang còn trống. Chúng tôi rất lấy làm tiếc. Xin quý khách vui lòng thử lại', 'error');
        }
        else {
          Swal.fire('Lỗi đặt vé', 'Có vẻ quý khách đã đặt số lượng ghế ECO nhiều hơn so với số lượng ghế ECO hiện đang còn trống. Chúng tôi rất lấy làm tiếc. Xin quý khách vui lòng thử lại', 'error');
        }
        
      }
    );
    }
  }
}
