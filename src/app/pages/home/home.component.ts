import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public date : any = "";
  public departure : any = "";
  public destination : any = "";
  constructor(private router: Router, private transferDataService: TransferDataService, private authService: AuthService) {

  }
  ngOnInit(): void {
    console.log(this.authService.isUser() + ' ' + this.authService.isAdmin())
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
