import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { GuestApiService } from '../../shared/services/guest-api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {
  password: string = '';
  showPassword: boolean = false;
  form: FormGroup| any;
  constructor(
    private formBuilder:FormBuilder,
    private guestApiService:GuestApiService,
    private authService:AuthService,
    private router :Router
  ){};
  isDisabled = true
  
  async ngOnInit(){
    this.form=this.createForm();
    this.authService.getUserId().subscribe((id) => {
      if(id !=0 ){
        this.guestApiService.getGuestListById(id).subscribe((data)=>{
          console.log(data)
          this.form.patchValue(data);
        });

      }
    });
    
  }
  

  createForm(){
    return this.formBuilder.group({
      Makhachhang: [0],
      // MaKh: [0],
     // maTaiKhoan: [0],
      HoTenKh:[''],
      Phai: [''],
      Sdt: [''],
      GmailKh: [''],
      TenTaiKhoan: [''],
      MaTaiKhoan: [''],
    })  
    
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  updateInfo(){
    var updateGuest = {
      makhachhang: this.form.value.Makhachhang,
      maTaiKhoan: this.form.value.MaTaiKhoan,
      hoTenKh: this.form.value.HoTenKh,
      phai: this.form.value.Phai,
      sdt: this.form.value.Sdt,
      gmailKh: this.form.value.GmailKh,
      tenTaiKhoan: this.form.value.TenTaiKhoan,
      maChuyenBay: '',
      maVe: 0
    }
    Swal.fire({
      title: 'Chỉnh sửa',
      text: "Bạn có muốn lưu các thay đổi về thông tin cá nhân của mình không?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Lưu chỉnh sửa',
      cancelButtonText: 'Hủy'  
    }).then((result) => {
      if (result.isConfirmed) {
        this.guestApiService.updateGuest(this.form.value.Makhachhang, updateGuest).subscribe(() => {
          Swal.fire(
            'Đã cập nhật!',
            'Đã cập nhật thành công thông tin cá nhân của bạn',
            'success'
          ).then(() => {
            this.ngOnInit()
          })
        }, (error) => {
          Swal.fire(
            'Lỗi cập nhật!',
            'Đã xảy ra lỗi khi hệ thống cập nhật thông tin cá nhân của bạn. Vui lòng thử lại',
            'error'
          );
        })
      }
    })
    
  }
}
