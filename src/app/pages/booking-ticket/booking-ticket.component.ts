import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChuyenBayService } from '../../shared/services/chuyenBay.service';
import { Router } from '@angular/router';
import { CookieService } from '../../shared/services/cookie.service';
import { ActivatedRoute } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.scss'],
})
export class BookingTicketComponent {
  form: FormGroup | any;
  fromPlace: string[] = [
    'VIETNAM',
    'THAILAN',
    'ANH',
    'NHATBAN',
    'HANQUOC',
    'MY',
    'PHAP',
    'NGA',
    'SINGAPORE',
    'HONGKONG',
  ];
  toPlace: string[] = [
    'VIETNAM',
    'THAILAN',
    'ANH',
    'NHATBAN',
    'HANQUOC',
    'MY',
    'PHAP',
    'NGA',
    'SINGAPORE',
    'HONGKONG',
  ];
  tickets: any[] = [];
  textError: string = '';
  date: string = '';
  origin: string = '';
  destination: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private chuyenBayService: ChuyenBayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private transferDataService: TransferDataService) {
      if (this.data){
        this.date = this.data.date;
        this.origin = this.data.origin;
        this.destination = this.data.destination;
        this.form = this.createForm();
        this.updateTicketList();
        this.transferDataService.clearData();
      }
      else {
        this.form = this.createForm();
        this.date = ''
        this.origin = ''
        this.destination = ''
        this.updateTicketList();
        this.transferDataService.clearData();
      }
    }

  data = this.transferDataService.getData();
  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe(params => {
      // this.date = '';
      // this.origin = '';
      // this.destination = '';

      // this.form = this.createForm();
      // this.updateTicketList();
    // });

    if (this.data){
      this.date = this.data.date;
      this.origin = this.data.origin;
      this.destination = this.data.destination;
      this.form = this.createForm();
      this.updateTicketList();
      this.transferDataService.clearData();
    }
    else {
      this.form = this.createForm();
      this.date = ''
      this.origin = ''
      this.destination = ''
      this.updateTicketList();
      this.transferDataService.clearData();
    }

    

      // this.inputFromPlace(this.origin);
      // this.inputToPlace(this.destination);
      // this.form.get('startDate').setValue(this.date);
      // if (this.date == '' && this.origin == '' && this.destination == '') {
      //   this.chuyenBayService.getAll().subscribe((data) => (this.tickets = data));
      // }
      // else {
      //   this.chuyenBayService
      //     .filterChuyenBay({ startDate: this.date, fromPlace: this.origin, toPlace: this.destination })
      //     .subscribe((data) => (this.tickets = data));
      // }
    
  }

  ngOnDestroy() {}

  createForm() {
    return this.formBuilder.group({
      fromPlace: this.formBuilder.control(['']),
      toPlace: this.formBuilder.control(['']),
      startDate: this.formBuilder.control(['']),
    });
  }

  inputFromPlace(place: string) {
    this.form.get('fromPlace').setValue(place);
    console.log(this.form.value);
  }
  inputToPlace(place: string) {
    this.form.get('toPlace').setValue(place);
    console.log(this.form.value)
  }

  onSubmit() {
    // if (
    //   this.form.value.startDate != '' &&
    //   this.form.value.fromPlace != '' &&
    //   this.form.value.toPlace != ''
    // ) {
    //   this.form
    //     .get('startDate')
    //     .setValue(
    //       new Date(this.form.value.startDate).toISOString().substring(0, 10)
    //     );
    //   this.chuyenBayService
    //     .filterChuyenBay(this.form.value)
    //     .subscribe((data) => (this.tickets = data));
    //   this.textError = '';
    // } else {
    //   this.textError = 'Vui lòng chọn đầy đủ thông tin!!!';
    // }

    // if (
    //   this.form.value.startDate != '' &&
    //   this.form.value.fromPlace != '' &&
    //   this.form.value.toPlace != ''
    // ) {
    //   this.form
    //     .get('startDate')
    //     .setValue(
    //       new Date(this.form.value.startDate).toISOString().substring(0, 10)
    //     );
    //     const queryParams = {
    //       date: this.form.value.startDate,
    //       origin: this.form.value.fromPlace,
    //       destination: this.form.value.toPlace,
    //     };
    //     console.log(queryParams)
    //     this.router.navigate([], {
    //       relativeTo: this.activatedRoute,
    //       queryParams,
    //       queryParamsHandling: 'merge', // Giữ lại các query params khác
    //     });
    // } else {
    //   this.textError = 'Vui lòng chọn đầy đủ thông tin!!!';
    // }

    this.form
    .get('startDate')
    .setValue(
      new Date(this.form.value.startDate).toISOString().substring(0, 10)
    );
    const queryParams = {
      date: this.form.value.startDate,
      origin: this.form.value.fromPlace,
      destination: this.form.value.toPlace,
    };
    console.log(queryParams)
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge', // Giữ lại các query params khác
    });

    // const queryParams = {
    //   date: this.form.get('startDate').value,
    //   origin: this.form.get('origin').value,
    //   destination: this.form.get('destination').value,
    // };

    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams,
    //   queryParamsHandling: 'merge', // Giữ lại các query params khác
    // });
  }

  updateTicketList() {
    if (this.date === '' && this.origin === '' && this.destination === '') {
      this.chuyenBayService.getAll().subscribe((data) => (this.tickets = data));
    } else {
      this.chuyenBayService
        .filterChuyenBay({ startDate: this.date, fromPlace: this.origin, toPlace: this.destination })
        .subscribe((data) => (this.tickets = data));
    }
  }

  refreshPage() {
    const queryParams = {
      date: '',
      origin: '',
      destination: '',
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  checkLogin(ma: string) {
    if (this.cookieService.getCookie('access_token')) {
      this.router.navigate([`/booking-ticket-detail/${ma}`]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
