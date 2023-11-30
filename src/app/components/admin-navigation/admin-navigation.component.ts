// import { routingComponents } from './../../app-routing.module';
import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from '../../shared/services/cookie.service';
// import { routingComponents } from 'src/app/app-routing.module';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent {
  constructor(private router: Router, private cookieService: CookieService) { }
  ngOnInit(): void {
    
  }
  onLogout(){
    this.cookieService.deleteCookie('access_token');
    this.router.navigate(['/login']);
  }
}
