import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { Invoice } from 'src/app/shared/models/invoiceModel';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { GetCountryService } from 'src/app/shared/services/get-country.service';
import Swal from 'sweetalert2';
import { error } from 'jquery';

// interface Flight {
//   maChuyenBay: string,
//   tenMayBay: string,
//   noiXuatPhat: string,
//   noiDen: string,
//   ngayXuatPhat: Date,
//   gioBay: any
// }

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})

export class InvoiceDetailComponent {
  public payPalConfig?: IPayPalConfig;
  invoice: Invoice | undefined;
  flight: any | undefined;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private getCountryService: GetCountryService
  ) { }
  ngOnInit() {
    if (!this.authService.isUser()){
      this.router.navigate(['/login']);
    }
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadInvoice(id);
    this.initPayPalConfig();
  }
  loadInvoice(id: any | null){
    if (!id){
      this.router.navigate(['/invoices']);
    } else {
      // console.log(id, this.authService.thisAccountId())
      this.invoiceService.getInvoiceById(id, this.authService.thisAccountId()).subscribe({next: (data) => {
        console.log(data)
        this.invoice = data;
        this.loadFlightInfo(data.maChuyenBay);
        const slug = this.activatedRoute.snapshot.paramMap.get('slug');
        const expectedSlug = `thong-tin-chi-tiet-hoa-don`
        if (slug !== expectedSlug){
          this.router.navigate([`/invoice-detail`, id, expectedSlug], {replaceUrl: true});
        }
      }, error: () => {
        this.router.navigate(['/invoices'])
      }})
    }
  }
  loadFlightInfo(machuyenbay: any){
    this.invoiceService.getFlightInfoOfInvoice(machuyenbay).subscribe({next: (data) => {
      this.flight = data
      console.log(data)
    }})
  }
  public returnCountryName(country: string){
    return this.getCountryService.getCountryNameInUnicode(country);
  }

  private initPayPalConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'ASzbDbw5YCZBXa_XcOuIHQNW_nMUKuem-c6xdgprJ77xRKLAr8DcXLQVHPnSeinenvQu7wLND9mNtaM8',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.invoice?.tongGia.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.invoice?.tongGia.toString(),
              }
            }
          },
          items: [
            {
              name: `Giá vé chuyến bay ${this.invoice?.maChuyenBay} từ ${this.returnCountryName(this.flight?.NoiXuatPhat)} đến ${this.returnCountryName(this.flight?.NoiDen)}`,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.invoice?.tongGia.toString(),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details : any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: async (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      try {
        await this.invoiceService.updatePayStatus(this.invoice?.idhoadon, "PAYPAL", data.id).toPromise();
        await Swal.fire('Thanh toán thành công', 'Thanh toán hóa đơn thành công.', 'success');
        this.router.navigate(['/invoices']);
    } catch (error) {
        console.error('Error updating payment status:', error);
        Swal.fire('Lỗi', 'Đã xảy ra lỗi trong quá trình thanh toán.', 'error');
    }
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
