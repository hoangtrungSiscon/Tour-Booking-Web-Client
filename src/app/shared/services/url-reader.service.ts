import { Injectable } from '@angular/core';
import { GetCountryService } from './get-country.service';
import { GetPlaneNameService } from './get-plane-name.service';
import slugify from 'slugify';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlReaderService {

  constructor(
    private getCountryService: GetCountryService,
    private getPlaneNameService: GetPlaneNameService
  ) { }

  async generateFlightIdFromSlug(url: string): Promise<string> {

    const dateRegex = /ngay-(\d{2})-thang-(\d{2})-nam-20(\d{2})/;
    const dateMatch = url.match(dateRegex);
    const day = dateMatch ? dateMatch[1] : '';
    const month = dateMatch ? dateMatch[2] : '';
    const year = dateMatch ? dateMatch[3] : '';

    const originDestinationRegex = /thong-tin-chi-tiet-chuyen-bay-tu-([\w-]+)-den-([\w-]+)-may-bay/;
    const originDestinationMatch = url.match(originDestinationRegex);
    const origin = this.getCountryService.getCountryCodeFromSlug(originDestinationMatch ? originDestinationMatch[1] : '');
    const destination = this.getCountryService.getCountryCodeFromSlug(originDestinationMatch ? originDestinationMatch[2] : '');

    console.log(originDestinationMatch + ' originDestinationMatch');
    console.log(origin + ' origin');
    console.log(destination + ' destination');

    const planeRegex = /may-bay-([\w-]+)-ngay/;
    const planeMatch = url.match(planeRegex);
    const planeCode = planeMatch ? await this.getPlaneNameService.getPlaneCodeFromSlug(planeMatch[1]) : '';
    // const planeSlug = planeMatch ? planeMatch[1] : '';

    const flightId = `${day}${month}${year}${origin}TO${destination}${planeCode}`;
    return flightId;
  
  }
  async generateSlugFromFlightId(flightId: string): Promise<string>  {
    const day = flightId.substring(0, 2);
    const month = flightId.substring(2, 4);
    const year = flightId.substring(4, 6);
    const origin = slugify(this.getCountryService.getCountryName(flightId.substring(6, 8)), { lower: true });
    const destination = slugify(this.getCountryService.getCountryName(flightId.substring(10, 12)), { lower: true });
    let planeName = await this.getPlaneNameService.getSlugFromPlaneCode(flightId.substring(12, 14));
    console.log(planeName + 'tìm thấy')

    let slug = `thong-tin-chi-tiet-chuyen-bay-tu-${origin}-den-${destination}-may-bay-${planeName}-ngay-${day}-thang-${month}-nam-20${year}`;
    return slug;
  }
}
