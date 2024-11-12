import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';  // Your component
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';  // AuthService path
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from '../../shared/services/cookie.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;
  
  beforeEach(() => {
    const cookieServiceMock = jasmine.createSpyObj('CookieService', ['setCookie']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login', 'storeData', 'setUserId', 'setVaiTro']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  describe('login', () => {

    it('should navigate to the login success route when login is successful', () => {
      const mockResponse = '102 1'; // Giả lập một phản hồi đăng nhập hợp lệ với ID tài khoản, token và vai trò
      const formData = { taiKhoan1: 'hoangtrung', matKhau: '123456' };

      spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock phản hồi đăng nhập thành công
      spyOn(authService, 'storeData'); // Mock phương thức storeData
      spyOn(router, 'navigate'); // Mock phương thức điều hướng

      authService.login(formData);
      expect(authService.login).toHaveBeenCalledWith(formData);

      // Kiểm tra dữ liệu có được lưu đúng không
      expect(authService.storeData).toHaveBeenCalledWith('', 102, 1);
    
      // Kiểm tra xem có điều hướng đúng không
      expect(router.navigate).toHaveBeenCalledWith([authService.getLoginSuccessRedirect()]);
    });

    it('should show error alert when login fails', () => {
      const mockResponse = 'false'; // Giả lập phản hồi đăng nhập thất bại
      const formData = { taiKhoan1: 'hoangtrung', matKhau: '123456' };

      spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock phản hồi đăng nhập thất bại
      spyOn(Swal, 'fire'); // Mock SweetAlert

      authService.login(formData);

      // Kiểm tra
      expect(authService.login).toHaveBeenCalledWith(formData); // Kiểm tra xem login có được gọi với dữ liệu đúng không
      expect(Swal.fire).toHaveBeenCalledWith(
        'Đăng nhập không thành công!',
        'Tên tài khoản hoặc mật khẩu không chính xác. Xin vui lòng thử lại',
        'error' // Kiểm tra xem có hiển thị thông báo lỗi đúng không
      );
    });
  });
  
});
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: any;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login', 'storeData', 'setUserId', 'setVaiTro']);
    const cookieServiceMock = jasmine.createSpyObj('CookieService', ['setCookie']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const swalMock = jasmine.createSpyObj('Swal', ['fire']); // Mock Swal

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should call onLogin and navigate on successful login', () => {
    const mockResponse = '102 1'; // Mock successful login response
    spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock login response
    spyOn(authService, 'storeData');
    spyOn(router, 'navigate');
    spyOn(cookieService, 'setCookie');

    component.form.controls['taiKhoan1'].setValue('hoangtrung');
    component.form.controls['matKhau'].setValue('123456');

    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith({ taiKhoan1: 'hoangtrung', matKhau: '123456' });
    expect(authService.storeData).toHaveBeenCalledWith('', 102, 1);
    expect(cookieService.setCookie).toHaveBeenCalledWith('access_token', ''); 
    expect(router.navigate).toHaveBeenCalledWith([authService.getLoginSuccessRedirect()]);
  });

  it('should show error alert when login fails', () => {
    const mockResponse = 'false'; // Mock failed login response
    spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock failed login response
    spyOn(Swal, 'fire'); // Mock Swal.fire

    component.form.controls['taiKhoan1'].setValue('hoangtrung1');
    component.form.controls['matKhau'].setValue('1234');

    component.onLogin();

    expect(Swal.fire).toHaveBeenCalledWith(
      'Đăng nhập không thành công!',
      'Tên tài khoản hoặc mật khẩu không chính xác. Xin vui lòng thử lại',
      'error'
    );
  });
});
