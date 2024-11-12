// new-account.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuestApiService } from '../../shared/services/guest-api.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})

export class NewAccountComponent {
  visible: boolean = true;
  changetype: boolean = true;
  text = "Show";
  registerForm: FormGroup;
  GuestID: any[] = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private guestApiService: GuestApiService,

  ) {
    this.registerForm = this.fb.group({
      TenTaiKhoan: '',
      MatKhau: '',
      HoTenKh: '',
      Phai: '',
      Sdt: '',
      GmailKh: '',
    });
    const id = this.activatedRoute.snapshot.params['id'];
    this.getGuestById(id);
  }

  getGuestById(id: number) {
    this.guestApiService.getGuestListById(id).subscribe(guest => {
      if (Array.isArray(guest)) {
        guest.forEach(element => {
          this.GuestID.push(element);
        });
      } else {
        // Handle non-array response (e.g., push the whole object)
        this.GuestID.push(guest);
      }
    });
    
  }

  
  
  


  viewpass() {
    this.text = this.changetype ? 'Hide' : 'Show';
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}
