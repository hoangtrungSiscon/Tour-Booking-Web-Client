import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../shared/services/auth.service'; // Đảm bảo đường dẫn chính xác
import { CookieService } from '../../shared/services/cookie.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

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

  describe('onLogin', () => {

    it('should navigate to the login success route when login is successful', () => {
      const mockResponse = '102 1'; // Giả lập một phản hồi đăng nhập hợp lệ với ID tài khoản, token và vai trò
      const formData = { taiKhoan1: 'hoangtrung', matKhau: '123456' };

      spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock phản hồi đăng nhập thành công
      spyOn(authService, 'storeData'); // Mock phương thức storeData
      spyOn(router, 'navigate'); // Mock phương thức điều hướng

      authService.login(formData);

      // Kiểm tra
      expect(authService.login).toHaveBeenCalledWith(formData); // Kiểm tra xem login có được gọi với dữ liệu đúng không
      expect(authService.storeData).toHaveBeenCalledWith('some_token', 102, 1); // Kiểm tra dữ liệu có được lưu đúng không
      expect(router.navigate).toHaveBeenCalledWith([authService.getLoginSuccessRedirect()]); // Kiểm tra xem có điều hướng đúng không
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
