import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public date : any = "";
  public departure : any = "";
  constructor(private router: Router) {

  }
  searchFlight() {
    // console.log(this.date);
    // console.log(this.departure);
    // this.router.navigate(['/booking-ticket', this.date, this.departure]);
  }
}
