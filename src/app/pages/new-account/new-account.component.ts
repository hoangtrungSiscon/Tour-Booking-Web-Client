import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {
  visible:boolean = true;
  changetype:boolean = true;
  hide = true;
  text="Show";
  viewpass(){
    if(this.text=="Show"){
      this.text="Hide";
    }
    else{
      this.text="Show";
    }
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  registerForm=this.fb.group({
    MaKh:'',
    MaTaiKhoan:'',
    HoTenKh:'',
    Phai:'',
    Sdt:'',
    GmailKh:'',
  })
  constructor(private fb:FormBuilder){}
  onSubmit(): void{
    console.log('submitted form', this.registerForm.value);
    
  }
}
