import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { Invoice } from 'src/app/shared/models/invoiceModel';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  public payPalConfig?: IPayPalConfig;
  
  displayedColumns: string[] = ['maVe', 'ngayDatVe', 'tinhTrangThanhToan', 'tongGia','actions'];
  dataSource = new MatTableDataSource<Invoice>();
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private invoiceService: InvoiceService,
    private title: Title,
  ) { }
 
  ngOnInit() {
    if (!this.authService.isUser()){
      this.router.navigate(['/login']);
    }
    this.loadInvoices();
    this.title.setTitle("FlightDot - Danh sách giao dịch")
  }
  loadInvoices(){
    this.invoiceService.getInvoicesByAccountId(this.authService.thisAccountId()).subscribe((data) => {
      this.dataSource.data = data;
    })
  }
  goesToInvoiceDetail(id : any){
    const slug = `thong-tin-chi-tiet-hoa-don`;
    this.router.navigate([`/invoice-detail`, id, slug]);
  }
}
