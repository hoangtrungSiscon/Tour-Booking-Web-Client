import { error } from 'jquery';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent {
  public payStatus: string = 'waiting';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.payStatus = 'waiting';
    const invoiceId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(invoiceId);
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      // console.log(params['vnp_TransactionNo']);
      // this.invoiceService.updatePayStatus(invoiceId, "VNPAY", params['vnp_TransactionNo']).subscribe({next: (data) => {
        
      // }})
      this.updatePayStatus(invoiceId, params)
    });
  }
  updatePayStatus(id: any, params: any) {
    if (params['vnp_TransactionStatus'] === '00') {
      this.invoiceService.updatePayStatus(id, this.authService.thisAccountId(), "VNPAY", params['vnp_TransactionNo']).subscribe({next: (data) => {
        this.payStatus = 'success';
      }, error: (error) => {
        this.payStatus = 'fail';
      }})
    }
    else {
      this.payStatus = 'fail';
    }
  }
  exit(){
    this.router.navigate([`/invoices`]);
  }
}
