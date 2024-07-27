import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCountryService {

  constructor() { }

  getCountryName(code: string): string {
    const countryMap: { [key: string]: string } = {
      JP: 'Nhật Bản',
      UK: 'Anh',
      TH: 'Thái Lan',
      VN: 'Việt Nam',
      FR: 'Pháp',
      RU: 'Nga',
      SG: 'Singapore',
      HK: 'Hồng Kông',
      KR: 'Hàn Quốc',
      US: 'Mỹ',
    };
    return countryMap[code];
  }
}
