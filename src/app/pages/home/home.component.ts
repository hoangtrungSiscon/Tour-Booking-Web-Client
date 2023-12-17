import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransferDataService } from 'src/app/shared/services/transfer-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    // console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('currentUser')?.split(' ')[0]);
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
