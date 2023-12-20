import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { CookieService } from '../../shared/services/cookie.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  form: FormGroup | any;
  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }
  ngOnInit(): void {
    
  }
  goToPart(fragment:any){
    this.router.navigateByUrl('home#' + fragment)
  }

  canAccess(url: string){
    if(this.cookieService.getCookie('access_token')){
      this.router.navigate([`/${url}`]);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  canAccessAdmin(url: string){
    if(this.cookieService.getCookie('access_token')){
      this.authService.getVaiTro().subscribe((vaiTro)=>{
        if(vaiTro==1){
          Swal.fire('Bạn cần tài khoản admin!',
            'Login with admin account',
            'error')
            this.router.navigate(['/home']);
          
        }
        else{
          this.router.navigate([`/${url}`])
        }
      });
      }
      else{    
      this.router.navigate(['/login']);
    }
  }

  onLogout(){
    this.cookieService.deleteCookie('access_token');
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  // onLogin(){
  //   this.authService.login(this.form.value).subscribe(async (data: string) => {
      
  //     if(data){
  //       let list: string[] = data.split(' ');
  //       let vaiTro = Number.parseInt(list[2]);
  //       this.authService.setVaiTro(vaiTro);
  //       if (vaiTro==0){
  //         this.router.navigate(['/admin-dashboard'])
  //       }
  //       else{
  //         Swal.fire('Bạn cần tài khoản admin!',
  //         'Login with admin account',
  //         'error')
  //         this.router.navigate(['/home'])
  //       }
        
  //     }
  //     else{
  //       Swal.fire('Đăng nhập không thành công!',
  //       'Sai giá trị',
  //       'error')
  //     }
  //   })
  // }
}
