import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Validator } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  visible:boolean = true;
  changetype:boolean = true;
  hide = true;
  form: FormGroup| any;
  checkPass: FormControl = this.formBuilder.control('');
  message: string = ''

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router,private meta:Meta,private title:Title){};
  ngOnInit(){
    this.form=this.createForm();
    this.checkPass.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      if(this.form.get('matKhau').value != data){
        this.message="Mật khẩu không trùng nhau, vui lòng nhập lại"
      }
      else{
        this.message = ""
      }
    })
    this.setMetaForSignUpPage()
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
  setMetaForSignUpPage() : void {
    this.removeUnwantedMetaTags();
    // Cập nhật tiêu đề
    this.title.setTitle('FlightDot - Đăng kí tài khoản');
    
    // Thêm các thẻ meta mới
    this.meta.addTag({ name: 'keywords', content: 'Đặt vé máy bay qua flightdot, FlightDot, flightdot booking, flightdot azure, minhkhanh, hoangtrung, flight.' });
    this.meta.addTag({ name: 'description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.addTag({ property: 'og:url', content: 'https://flightdotclient.azurewebsites.net/sign-up' });
    this.meta.addTag({ property: 'og:title', content: 'FlightDot - Đăng kí tài khoản' });
    this.meta.addTag({ property: 'og:description', content: 'Website đặt vé máy bay - FlightDot tiện lợi và nhanh chóng, giúp bạn tìm kiếm, so sánh giá vé, và đặt chỗ chỉ trong vài bước đơn giản. Với giao diện thân thiện và hỗ trợ 24/7, chúng tôi mang đến trải nghiệm mua vé dễ dàng và an toàn cho mọi chuyến bay của bạn.' });
    this.meta.addTag({ property: 'og:image', content: 'https://imgur.com/WaACbcs' });    
  }
  createForm(){
    return this.formBuilder.group({
      taiKhoan1: ['',[Validators.required]],
      matKhau: ['',[Validators.required]],
      tenKH: ['',[Validators.required]],
      sdt: ['',[
        Validators.pattern(/^\d+$/), // Chỉ chấp nhận số
        Validators.minLength(9),     // Độ dài ít nhất là 9
        Validators.maxLength(11),
        Validators.required    // Độ dài tối đa là 11
      ]],
      gamilKH: ['',[Validators.required,Validators.email]],
      phai: ['',Validators.required]
    })  
    
  }


  setPhai(input: string){
    this.form.get('phai').setValue(input);
  }

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;

  }
  alertSuccess(){
    this.authService.register(this.form.value).subscribe(
    ()=>{
      Swal.fire('Chúc mừng',
        'Đăng ký tài khoản thành công!','success'
        ).then(()=>{
          this.router.navigate(['/login'])
        })
    }, (error) => {
      Swal.fire('Lỗi đăng ký', 'Có vẻ đã có lỗi xảy ra khi thực hiện đăng ký tài khoản. Vui lòng thử lại.', 'error');
    })
    
  }
}
