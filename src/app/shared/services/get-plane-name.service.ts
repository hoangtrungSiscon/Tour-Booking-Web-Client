import { Injectable } from '@angular/core';
import { PlaneApiService } from './plane-api.service';
import slugify from 'slugify';
import { map, Observable } from 'rxjs';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class GetPlaneNameService {

  constructor(private planeApiService: PlaneApiService) { }

  // getPlaneCodeFromSlug(slug: string){
  //   let code = '';
  //   this.planeApiService.getPlaneList().subscribe((data: any[]) => {
  //     console.log(data)
  //     for (let i = 0; i < data.length; i++) {
  //       if (slugify(data[i].tenMayBay.replace('Máy bay ', ''), { lower: true }) === slug) {
  //         console.log(slugify(data[i].tenMayBay.replace('Máy bay ', ''), { lower: true }))
  //         code = data[i].maMayBay.replace('Plane','');
  //         console.log('tìm thấy máy bay: ' + code + 'slug: ' + slug);
  //       }
  //     }
  //   });
  //   return code;
  // }

  getPlaneCodeFromSlug(slug: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.planeApiService.getPlaneList().subscribe({
        next: (data : any[]) => {
          let code = '';
          for (let i = 0; i < data.length; i++) {
            if (slugify(data[i].tenMayBay.replace('Máy bay ', ''), { lower: true }) === slug) {
              code = data[i].maMayBay.replace('Plane', '');
              break;
            }
          }
          resolve(code);
        }, error: (err) => reject(err),
    });
    })
    
  }
  
  getSlugFromPlaneCode(code: string):Promise<string> {
    return new Promise((resolve, reject) => {
      this.planeApiService.getPlaneList().subscribe({
        next: (data: any) => {
          let slug = '';
          for (let i = 0; i < data.length; i++) {
            if (data[i].maMayBay === 'Plane' + code) {
              slug = slugify(data[i].tenMayBay.replace('Máy bay ', ''), { lower: true });
              break;
            }
          }
          resolve(slug);
        },
        error: (err) => reject(err),
      });
    });
  
  }
}
