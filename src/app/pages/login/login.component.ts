import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from '../../shared/services/cookie.service';

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
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.form = this.createForm();
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
    // const itemExists = localStorage.getItem('token') !== null ? true : false;
    // console.log(itemExists);
    console.log(this.authService.isLoggedIn())
    this.authService
      .login(this.form.value)
      .subscribe(async (data: string | any) => {
        if (data && data != 'false') {
          let list: string[] = data.split(' ');
          let token: string = list[1];
          
          let maTaiKhoan = Number.parseInt(list[0]);
          let vaiTro = Number.parseInt(list[2]);
          this.authService.storeData(token, maTaiKhoan, vaiTro);


          let currentUser = localStorage.getItem('currentUser')?.toString()[0];
          console.log(currentUser);
          this.cookieService.setCookie('access_token', token);
          this.authService.setUserId(maTaiKhoan);
          this.authService.setVaiTro(vaiTro);
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Đăng nhập không thành công!', 'Tên tài khoản hoặc mật khẩu không chính xác. Xin vui lòng thử lại', 'error');
        }
      });
  }
}
