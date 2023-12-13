import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChuyenBayService } from '../../shared/services/chuyenBay.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ChiTietVeService } from '../../shared/services/chiTietVe.service';
import { AuthService } from '../../shared/services/auth.service';
import { KhachHangService } from '../../shared/services/khachHang.service';

@Component({
  selector: 'app-booking-ticket-detail',
  templateUrl: './booking-ticket-detail.component.html',
  styleUrls: ['./booking-ticket-detail.component.scss'],
})
export class BookingTicketDetailComponent implements OnInit {
  flightInfo: any;
  form: FormGroup | any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chuyenBayService: ChuyenBayService,
    private formBuilder: FormBuilder,
    private chiTietVeService: ChiTietVeService,
    private router: Router,
    private authService: AuthService,
    private khachHangService: KhachHangService
  ) {}

  ngOnInit() {
    this.form = this.createForm();
    this.authService.getUserId().subscribe((data) => {
      this.khachHangService.getByMaTaiKhoan(data).subscribe((info) => {
        this.form.patchValue(info);
      });
    });
    this.chuyenBayService
      .getByCode(this.activatedRoute.snapshot.paramMap.get('code'))
      .subscribe((flight: any) => {
        this.flightInfo = flight;
      });
  }

  createForm() {
    let form: FormGroup | any = this.formBuilder.group({
      maVe: [0],
      maChuyenBay: [''],
      maTaiKhoan: [0],
      tenKh: [''],
      soLuong: [0, Validators.required],
      gmailKh: [''],
      tongGia: [0],
      sdt: [''],
      ngayDatVe: [new Date().toISOString()],
      phai: [''],
      loaiVe: ['BSN', Validators.required],
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
    this.form
      .get('maChuyenBay')
      .setValue(this.flightInfo?.chuyenBay.maChuyenBay);
    console.log(this.form.value);
    this.chiTietVeService.create(this.form.value).subscribe((data) => {
      if (data) {
        Swal.fire(
          'Bạn đã đặt vé thành công',
          'Chúc bạn có một chuyến đi thật tuyệt vời, rất hân hạnh được phục vụ quý khách',
          'success'
        ).then(() => {
          this.router.navigate(['/booking-ticket']);
        });
      } else {
        Swal.fire('Đề nghị điền đủ dữ liệu', 'Thiếu dữ liệu', 'error');
      }
    });
  }
}
