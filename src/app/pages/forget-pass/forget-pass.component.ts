import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {
  resendCode(){
     
  Swal.fire('Đã gửi mã')
  }
}
