import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';


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
        this.message="Error message"
      }
      else{
        this.message = ""
      }
    })
  }
  
  createForm(){
    return this.formBuilder.group({
      taiKhoan1: [''],
      matKhau: [''],
      tenKH: [''],
      sdt: [''],
      gamilKH: [''],
      phai: ['']
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
