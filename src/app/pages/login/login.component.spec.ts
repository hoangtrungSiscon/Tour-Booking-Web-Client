import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../shared/services/cookie.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';

// Mock the dependencies
class MockAuthService {
  login(request: any) {
    // Simulate successful login response
    return of('123 456 0'); // Example: token, account id, role
  }
  storeData(token: any, maTaiKhoan: any, vaiTro: any) {}
  setUserId(id: any) {}
  setVaiTro(role: any) {}
  getLoginSuccessRedirect() {
    return '/home';
  }
}

class MockCookieService {
  setCookie(name: string, value: string) {}
}

class MockRouter {
  navigate(path: string[]) {}
}

class MockMeta {
  updateTag(tag: any) {}
}

class MockTitle {
  setTitle(title: string) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;
  let meta: Meta;
  let title: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService },
        { provide: CookieService, useClass: MockCookieService },
        { provide: Router, useClass: MockRouter },
        { provide: Meta, useClass: MockMeta },
        { provide: Title, useClass: MockTitle },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    meta = TestBed.inject(Meta);
    title = TestBed.inject(Title);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  

  it('should have a form with initial values', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.controls['taiKhoan1'].value).toBe('');
    expect(component.form.controls['matKhau'].value).toBe('');
  });

  it('should call login method on submit and navigate on success', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const cookieServiceSpy = spyOn(cookieService, 'setCookie');
    const storeDataSpy = spyOn(authService, 'storeData');
    const setUserIdSpy = spyOn(authService, 'setUserId');
    const setVaiTroSpy = spyOn(authService, 'setVaiTro');
  
    component.form.controls['taiKhoan1'].setValue('testuser');
    component.form.controls['matKhau'].setValue('password');
  
    component.onLogin();
  
    expect(authService.login).toHaveBeenCalled();
    expect(storeDataSpy).toHaveBeenCalledWith('123', 123, 0);
    expect(setUserIdSpy).toHaveBeenCalledWith(123);
    expect(setVaiTroSpy).toHaveBeenCalledWith(0);
    expect(cookieServiceSpy).toHaveBeenCalledWith('access_token', '123');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
  it('should show an error alert if login fails', () => {
    spyOn(authService, 'login').and.returnValue(of('false'));
  
    const swalSpy = spyOn(Swal, 'fire');
  
    component.onLogin();
  
    expect(swalSpy).toHaveBeenCalledWith(
      'Đăng nhập không thành công!',
      'Tên tài khoản hoặc mật khẩu không chính xác. Xin vui lòng thử lại',
      'error'
    );
  });
  

  it('should call viewpass to toggle password visibility', () => {
    expect(component.visible).toBe(true);
    component.viewpass();
    expect(component.visible).toBe(false);
    expect(component.changetype).toBe(false);
  
    component.viewpass();
    expect(component.visible).toBe(true);
    expect(component.changetype).toBe(true);
  });
  
});
