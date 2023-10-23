import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-ticket-detail',
  templateUrl: './booking-ticket-detail.component.html',
  styleUrls: ['./booking-ticket-detail.component.scss']
})
export class BookingTicketDetailComponent {
  constructor() {}

  showOnInit() {
    Swal.fire(
      'Bạn đã đặt vé thành công',
      'Chúc bạn có một chuyến đi thật tuyệt vời, rất hân hạnh được phục vụ quý khách',
      'success'
    )
  }
}
