import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';


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

  constructor(private formBuilder:FormBuilder, private authService:AuthService){};
  ngOnInit(){
    this.form=this.createForm();
    this.checkPass.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      if(this.form.get('matKhau').value != data){
        this.message="Not the same"
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
    this.authService.register(this.form.value).subscribe(()=>{
      Swal.fire('Chúc mừng',
        'Đăng ký thành công!',
        'success')
    })
    
  }
}
