import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { GuestApiService } from '../../shared/services/guest-api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/shared/services/cookie.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {
  password: string = '';
  showPassword: boolean = false;
  form: FormGroup| any;
  constructor(
    private formBuilder:FormBuilder,
    private guestApiService:GuestApiService,
    private authService:AuthService,
    private router :Router,
    private cookieService:CookieService
  ){};
  isDisabled = true
  
  async ngOnInit(){
    this.form=this.createForm();
    if (!this.authService.isUser()) {
      this.router.navigate(['/login']);
    }
    this.cookieService.setCookie('access_token',this.authService.getToken());
    console.log(this.authService.getUserId())
    this.guestApiService.getGuestListById(this.authService.thisAccountId()).subscribe((data)=>{
      this.form.patchValue(data);
    })
    
  }
  

  createForm(){
    return this.formBuilder.group({
      Makhachhang: [0],
      HoTenKh:['', Validators.required],
      Phai: [''],
      Sdt: ['',[
        // Validators.pattern('^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$')
        Validators.required,
        Validators.pattern(/^\d+$/), // Chỉ chấp nhận số
        Validators.minLength(9),     // Độ dài ít nhất là 9
        Validators.maxLength(11)     // Độ dài tối đa là 11
        ]
      ],
      GmailKh: ['', [
        Validators.email,
        Validators.required
        ]
      ],
      TenTaiKhoan: [''],
      MaTaiKhoan: [''],
    })  
    
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  updateInfo(){
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng kiểm tra lại các thông tin vừa nhập và đảm bảo các thông tin đó hợp lệ.'
      })
    }
    else {
      var updateGuest = {
        makhachhang: this.form.value.Makhachhang,
        maTaiKhoan: this.form.value.MaTaiKhoan,
        hoTenKh: this.form.value.HoTenKh,
        phai: this.form.value.Phai,
        sdt: this.form.value.Sdt,
        gmailKh: this.form.value.GmailKh,
        tenTaiKhoan: this.form.value.TenTaiKhoan,
        maChuyenBay: '',
        maVe: 0
      }
      console.log(updateGuest)
      Swal.fire({
        title: 'Chỉnh sửa',
        text: "Bạn có muốn lưu các thay đổi về thông tin cá nhân của mình không?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lưu chỉnh sửa',
        cancelButtonText: 'Hủy'  
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(updateGuest)
          this.guestApiService.updateGuest(this.form.value.Makhachhang, updateGuest).subscribe(() => {
            Swal.fire(
              'Đã cập nhật!',
              'Đã cập nhật thành công thông tin cá nhân của bạn',
              'success'
            ).then(() => {
              this.ngOnInit()
            })
          }, (error) => {
            Swal.fire(
              'Lỗi cập nhật!',
              'Đã xảy ra lỗi khi hệ thống cập nhật thông tin cá nhân của bạn. Vui lòng thử lại',
              'error'
            );
          })
        }
      })
    }
  }
}