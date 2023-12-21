import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() : void {
    if (!this.authService.isAdmin()){
      this.router.navigate(['/login']);
    }
  }
}
