import { Component } from '@angular/core';
import { TicketHistoryApiService } from 'src/app/shared/services/ticket-history-api.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent {
  constructor(
    private tickethistoryapi:TicketHistoryApiService,
    private authService:AuthService,
    private router :Router
  ){}
  async ngOnInit(){
    // this.form=this.createForm();
    this.authService.getUserId().subscribe((id) => {
      if(id !=0 ){
        this.tickethistoryapi.getTicketHistoryList(id).subscribe((data)=>{
          console.log(data)
          // this.form.patchValue(data);
        });

      }
    });
  }
}
