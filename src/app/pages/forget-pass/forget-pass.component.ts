import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent {
  email = new FormControl('');
  inputOtp = new FormControl('');
  request = {
    email: '',
    message: this.generateOTP(),
  };
  sentOtp: string = '';
  constructor(private authService: AuthService, private router: Router,    private meta: Meta,private title: Title,) {}

  ngOnInit() {
    this.email.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      if (this.email.dirty) {
        this.request.email = data;
      }
    });
    this.inputOtp.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data: any) => {
        if (this.inputOtp.dirty) {
          this.request.message = data;
        }
      });
      this.setMetaForForgetPassPage();
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
  setMetaForForgetPassPage() : void {
    this.removeUnwantedMetaTags();
    // Cập nhật tiêu đề
    this.title.setTitle('FlightDot - Phục hồi mật khẩu của bạn');
    
    // Thêm các thẻ meta mới
    this.meta.addTag({ name: 'keywords', content: 'Đặt vé máy bay qua flightdot, FlightDot, flightdot booking, flightdot azure, minhkhanh, hoangtrung, flight.' });
    this.meta.addTag({ name: 'description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.addTag({ property: 'og:url', content: 'https://flightdotclient.azurewebsites.net/forget-pass' });
    this.meta.addTag({ property: 'og:title', content: 'FlightDot - Phục hồi mật khẩu của bạn' });
    this.meta.addTag({ property: 'og:description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.addTag({ property: 'og:image', content: 'https://imgur.com/WaACbcs' });    
  }
  generateOTP() {
    // Declare a digits variable
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  resendCode() {
    this.authService.sendOtp(this.request).subscribe((data: any) => {
      if (data) {
        this.sentOtp += data;
        Swal.fire('Đã gửi mã OTP. Vui lòng kiểm tra email của bạn', '', 'success');
      } else {
        Swal.fire('Không tìm thấy email', 'Vui lòng nhập lại', 'error');
      }
    });
  }

  onSubmit() {
    if (this.sentOtp === this.inputOtp.value) {
      let requestChange = {
        email: this.request.email,
      };
      this.authService.changePassword(requestChange).subscribe((data) => {
        if (data) {
          Swal.fire('Khôi phục mật khẩu của bạn thành công', 'Mật khẩu mới của bạn đã được gửi qua email. Bạn sẽ được điều hướng trở lại trang đăng nhập.', 'success').then(() => {
            this.router.navigate(['/login']);
          });
        }
      }, (error) => {
        Swal.fire('Mã OTP không chính xác. Vui lòng thử lại', '', 'error');
      });
    }
    else {
      Swal.fire('Mã OTP không chính xác. Vui lòng nhập lại', '', 'error');
    }
  }
}
