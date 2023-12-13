import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFlightParam } from '../models/searchFlightParam';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  constructor(
    private router:Router,
  ) { }

  private data!: SearchFlightParam;

  setData(data: SearchFlightParam){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = ({
      date: '',
      origin: '',
      destination: ''
    });
  }
}
