import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from '../../shared/services/cookie.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  hide = true;
  
  form: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private meta: Meta,
    private title: Title,
  ) {}

  ngOnInit() {
    this.form = this.createForm();
    this.setMetaForLoginPage()
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
  setMetaForLoginPage() : void {
    // Cập nhật tiêu đề
    this.title.setTitle('FlightDot - Đăng nhập tài khoản');
    
    // Thêm các thẻ meta mới
    this.meta.updateTag({ name: 'keywords', content: 'Đặt vé máy bay qua flightdot, FlightDot, flightdot booking, flightdot azure, minhkhanh, hoangtrung, flight.' });
    this.meta.updateTag({ name: 'description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://flightdotclient.azurewebsites.net/login' });
    this.meta.updateTag({ property: 'og:title', content: 'FlightDot - Đăng nhập tài khoản' });
    this.meta.updateTag({ property: 'og:description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://i.imgur.com/WaACbcs.png' });    
  }
  createForm() {
    let form = this.formBuilder.group({
      taiKhoan1: [''],
      matKhau: [''],
    });

    return form;
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  onLogin() {
    this.authService
      .login(this.form.value)
      .subscribe(async (data: string | any) => {
        if (data && data != 'false') {
          let list: string[] = data.split(' ');
          let token: string = list[1];
          
          let maTaiKhoan = Number.parseInt(list[0]);
          let vaiTro = Number.parseInt(list[2]);
          this.authService.storeData(token, maTaiKhoan, vaiTro);

          this.cookieService.setCookie('access_token', token);
          this.authService.setUserId(maTaiKhoan);
          this.authService.setVaiTro(vaiTro);



          this.router.navigate([this.authService.getLoginSuccessRedirect()]);
        } else {
          Swal.fire('Đăng nhập không thành công!', 'Tên tài khoản hoặc mật khẩu không chính xác. Xin vui lòng thử lại', 'error');
        }
      });
  }
}
