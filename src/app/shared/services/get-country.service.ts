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
  getCountryNameInUnicode(name: string): string {
    const countryMap: { [key: string]: string } = {
      NHATBAN: 'Nhật Bản',
      ANH: 'Anh',
      THAILAN: 'Thái Lan',
      VIETNAM: 'Việt Nam',
      PHAP: 'Pháp',
      NGA: 'Nga',
      SINGAPORE: 'Singapore',
      HONGKONG: 'Hồng Kông',
      HANQUOC: 'Hàn Quốc',
      MY: 'Mỹ',
    };
    return countryMap[name];
  }
  getCountryCodeFromSlug(code: string): string {
    const countryMap: { [key: string]: string } = {
      'nhat-ban': 'JP',
      'anh': 'UK',
      'thai-lan' : 'TH',
      'viet-nam' : 'VN',
      'phap' : 'FR',
      'nga' : 'RU',
      'singapore' : 'SG',
      'hong-kong' : 'HK',
      'han-quoc' : 'KR',
      'my' : 'US',
    };
    return countryMap[code];
  }
  // getCountryCodeFromSlugAsync(code: string): Promise<string> {
  //   const countryMap: { [key: string]: string } = {
  //     'nhat-ban': 'JP',
  //     'anh': 'UK',
  //     'thai-lan' : 'TH',
  //     'viet-nam' : 'VN',
  //     'phap' : 'FR',
  //     'nga' : 'RU',
  //     'singapore' : 'SG',
  //     'hong-kong' : 'HK',
  //     'han-quoc' : 'KR',
  //     'my' : 'US',
  //   };
  //   return countryMap[code];
  // }
  getSlugFromCountryCode(code: string): string {
    const countryMap: { [key: string]: string } = {
      JP: 'nhat-ban',
      UK: 'anh',
      TH: 'thai-lan',
      VN: 'viet-nam',
      FR: 'phap',
      RU: 'nga',
      SG: 'singapore',
      HK: 'hong-kong',
      KR: 'han-quoc',
      US: 'my',
    };
    return countryMap[code];
  }
}
