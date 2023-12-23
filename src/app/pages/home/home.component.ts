import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as $ from 'jquery';
import { NewestFlightService } from 'src/app/shared/services/newest-flight.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public date : any = "";
  public departure : any = "";
  public destination : any = "";
  public newestflights: any[] = [];
  constructor(private router: Router, private transferDataService: TransferDataService, private authService: AuthService, private newestflight: NewestFlightService) {


  }
  async ngOnInit(){
    console.log(this.authService.isUser() + ' ' + this.authService.isAdmin())
    this.newestflight.getTop3NewestFlight().subscribe((data)=>this.newestflights=data)
  }
  searchFlight() {
    let data = {
      date: this.date,
      origin: this.departure,
      destination: this.destination
    }
    this.transferDataService.setData(data)
    this.router.navigate(['/booking-ticket']);
  }
}
// <div class="card" style="height: 300px;padding: 5px;border-radius: 20px;border: 2px solid #146c94;">
// <div class="card-body div-center" style="flex-direction: column;">
//   <h5 class="card-title">{{newestflights[0].noiXuatPhat}} - {{newestflights[0].noiDen}}</h5>
//   <p class="card-text"> 
//     Mã chuyến bay: {{newestflights[0].maChuyenBay}} - Máy bay: {{newestflights[0].tenMayBay}}
//     <br>
//     Ngày xuất phát: {{newestflights[0].ngayXuatPhat | date : "dd/MM/yyyy"}} - Giờ bay: {{newestflights[0].gioBay}}
//     <br>
//     Đơn giá: {{newestflights[0].donGia}}
//   </p>
//   <a href class="btn btn-primary">Go somewhere</a>
// </div>
// </div>
// <div class="card" style="height: 300px;padding: 5px;border-radius: 20px;border: 2px solid #146c94;">
// <div class="card-body div-center" style="flex-direction: column;">
//   <h5 class="card-title">{{newestflights[1].noiXuatPhat}} - {{newestflights[1].noiDen}}</h5>
//   <p class="card-text"> 
//     Mã chuyến bay: {{newestflights[1].maChuyenBay}} - Máy bay: {{newestflights[1].tenMayBay}}
//     <br>
//     Ngày xuất phát: {{newestflights[1].ngayXuatPhat | date : "dd/MM/yyyy"}} - Giờ bay: {{newestflights[1].gioBay}}
//     <br>
//     Đơn giá: {{newestflights[1].donGia}}
//   </p>
//   <a href class="btn btn-primary">Go somewhere</a>
// </div>
// </div>
// <div class="card" style="height: 300px;padding: 5px;border-radius: 20px;border: 2px solid #146c94;">
// <div class="card-body div-center" style="flex-direction: column;">
//   <h5 class="card-title">{{newestflights[2]?.noiXuatPhat}} - {{newestflights[2].noiDen}}</h5>
//   <p class="card-text"> 
//     Mã chuyến bay: {{newestflights[2].maChuyenBay}} - Máy bay: {{newestflights[2].tenMayBay}}
//     <br>
//     Ngày xuất phát: {{newestflights[2].ngayXuatPhat | date : "dd/MM/yyyy"}} - Giờ bay: {{newestflights[2].gioBay}}
//     <br>
//     Đơn giá: {{newestflights[2].donGia}}
//   </p>
//   <a href class="btn btn-primary">Go somewhere</a>
// </div>
// </div>