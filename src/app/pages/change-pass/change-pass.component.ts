import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'src/app/shared/services/cookie.service';
import Swal from 'sweetalert2'
import { AccountApiService } from 'src/app/shared/services/account-api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent {
  form: FormGroup| any;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private formBuilder:FormBuilder,
    private accountApiService: AccountApiService,
    private router: Router,
    private title: Title
  ){
  }
  visible:boolean = true;
  changetype:boolean = true;
  hide = true;
  changePasswordRequest: any = {
    accountId: 0,
    oldPassword: '',
    newPassword: '',
  }
  createForm(){
    return this.formBuilder.group({
      oldPassword:['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })  
  }
  ngOnInit(): void {
    this.form=this.createForm();
    this.changePasswordRequest.accountId = this.authService.thisAccountId()
    this.title.setTitle("FlightDot - Đổi mật khẩu mới")

  }
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;

  }
  alertSuccess(){
    Swal.fire(
      'Good job!',
      'Bạn đã đổi mật khẩu thành công',
      'success'
    )
  }
  confirm(){
    if (this.form.value.newPassword == this.form.value.oldPassword){
      Swal.fire(
        'Lỗi!',
        'Mật khẩu mới và mật khẩu cũ không được trùng nhau!',
        'error'
      )
    }
    else {
      if(this.form.value.newPassword != this.form.value.confirmPassword){
        Swal.fire(
          'Lỗi!',
          'Mật khẩu mới và mật khẩu xác nhận không trùng nhau!',
          'error'
        )
      }
      else {
        this.changePasswordRequest.oldPassword = this.form.value.oldPassword
        this.changePasswordRequest.newPassword = this.form.value.newPassword
        // console.log(this.changePasswordRequest)
        Swal.fire({
          title: 'Đổi mật khẩu',
          text: "Bạn có muốn thực hiện thay đổi mật khẩu cho tài khoản không?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đổi mật khẩu',
          cancelButtonText: 'Hủy'  
        }).then((result) => {
          if (result.isConfirmed) {
            this.accountApiService.changePassword(this.changePasswordRequest).subscribe(() => {
              Swal.fire(
                'Đã cập nhật!',
                'Đã cập nhật mật khẩu mới thành công.',
                'success'
              ).then(() => {
                this.router.navigate(['/home'])
              })
            }, (error) => {
              Swal.fire(
                'Lỗi!',
                'Mật khẩu không chính xác. Vui lòng thử lại!',
                'error'
              )
            })
          }
        })
        
      }
    }

    
    // console.log(this.changePasswordRequest)
  }
  
}
