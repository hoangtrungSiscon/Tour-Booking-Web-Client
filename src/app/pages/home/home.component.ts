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
    this.newestflight.getTop3NewestFlight().subscribe((data)=>this.newestflights=data)
  }
  searchFlight() {
    let data = {
      date: this.date,
      origin: this.departure,
      destination: this.destination
    }
    console.log(data)
    this.transferDataService.setData(data)
    this.router.navigate(['/booking-ticket']);
  }
}