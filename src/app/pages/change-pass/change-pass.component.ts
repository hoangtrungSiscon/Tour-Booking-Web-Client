import { Component } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent {
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
      'Bạn đã đổi mật khẩu thành công',
      'success'
    )
  }
}
