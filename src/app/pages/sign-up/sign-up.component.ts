import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Validator } from '@angular/forms';

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

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router){};
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
