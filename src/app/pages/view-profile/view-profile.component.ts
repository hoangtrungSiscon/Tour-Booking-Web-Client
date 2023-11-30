import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { GuestApiService } from '../../shared/services/guest-api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {
  password: string = '';
  showPassword: boolean = false;
  form: FormGroup| any;
  constructor(private formBuilder:FormBuilder, private guestApiService:GuestApiService, private authService:AuthService){};
  
  async ngOnInit(){
    this.form=this.createForm();
    this.authService.getUserId().subscribe((id) => {
      console.log(id)
      if(id !=0 ){
        this.guestApiService.getGuestListById(id).subscribe((data)=>{
          this.form.patchValue(data);
          console.log(this.form.value)
        });
      }
    });
    
  }
  

  createForm(){
    return this.formBuilder.group({
      Makhachhang: [0],
     // maTaiKhoan: [0],
      HoTenKh:[''],
      Phai: [''],
      Sdt: [''],
      GmailKh: [''],
     // maChuyenBay: [0],
     // maVe: [0]
    })  
    
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
