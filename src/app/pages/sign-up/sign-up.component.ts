import {Component} from '@angular/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  visible:boolean = true;
  changetype:boolean = true;
  hide = true;
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;

  }
  alertSuccess(){
    Swal.fire(
      'Good job!',
      'Bạn đã tạo tài khoản thành công',
      'success'
    )
  }
}
