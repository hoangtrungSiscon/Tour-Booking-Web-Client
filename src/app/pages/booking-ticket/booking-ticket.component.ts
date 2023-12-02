import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChuyenBayService } from '../../shared/services/chuyenBay.service';
import { Router, Routes } from '@angular/router';
import { CookieService } from '../../shared/services/cookie.service';

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.scss']
})
export class BookingTicketComponent {
  form: FormGroup | any;
  fromPlace: string[] = ['VIETNAM', 'THAILAN', 'ANH', 'NHATBAN', 'HANQUOC', 'MY', 'PHAP', 'NGA', 'SINGAPORE', 'HONGKONG']
  toPlace: string[] = ['VIETNAM', 'THAILAN', 'ANH', 'NHATBAN', 'HANQUOC', 'MY', 'PHAP', 'NGA', 'SINGAPORE', 'HONGKONG'];
  tickets: any[] = [];
  textError: string = '';
  constructor(private formBuilder: FormBuilder, private chuyenBayService: ChuyenBayService, private cookieService:CookieService, private router:Router) { }


  ngOnInit() {
    this.form = this.createForm();
    this.chuyenBayService.getAll().subscribe(data => this.tickets = data);
  }

  ngOnDestroy() { }

  createForm() {
    return this.formBuilder.group({
      fromPlace: this.formBuilder.control(['']),
      toPlace: this.formBuilder.control(['']),
      startDate: this.formBuilder.control(['']),
    })
  }

  inputFromPlace(place: string) {
    this.form.get('fromPlace').setValue(place);
  }
  inputToPlace(place: string) {
    this.form.get('toPlace').setValue(place);
  }

  onSubmit() {
    if (this.form.value.startDate != '' && this.form.value.fromPlace != '' && this.form.value.toPlace != '') {
      this.form.get('startDate').setValue(new Date(this.form.value.startDate).toISOString().substring(0, 10));
      this.chuyenBayService.filterChuyenBay(this.form.value).subscribe((data) => this.tickets = data);
      this.textError = "";
    }
    else {
      this.textError = "Vui lòng chọn đầy đủ thông tin!!!";
    }
  }

  canAccess(url: string){
    if(this.cookieService.getCookie('access_token')){
      this.router.navigate([`/${url}`]);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
