import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { FlightDetails } from 'src/app/shared/models/FlightDetailModel';
import { FlightApiService } from 'src/app/shared/services/flight-api.service';
import { PlaneApiService } from 'src/app/shared/services/plane-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {
  addFlightRequest: FlightDetails = {
    maChuyenBay: '',
    maMayBay: '',
    tenMayBay: '',
    noiXuatPhat: '',
    noiDen: '',
    ngayXuatPhat: '',
    gioBay: '',
    soLuongVeBsn: '',
    soLuongVeEco: '',
    donGia: '',
  }
  public flightTime_Hour: string = '00';
  public flightTime_Minute: string = '00';
  public flightTime_Second: string = '00';
  public planeList: any[] = []
  constructor(private flightService: FlightApiService, private planeService: PlaneApiService, private router: Router) {

  }
  ngOnInit(): void {
    this.planeService.getPlaneList().subscribe(data => {
      console.log(data)
      this.planeList = data;
      console.log(this.planeList)
    })
  }

  updatePlaneName(event: any, id: any) : void{
    const element = this.planeList.find(element => element.maMayBay == id);
    if (element) {
      this.addFlightRequest.tenMayBay = element.tenMayBay;

    }

  }

  addFlight(){
    if (
      this.addFlightRequest.maMayBay == '' ||
      this.addFlightRequest.tenMayBay == '' ||
      this.addFlightRequest.noiXuatPhat == '' ||
      this.addFlightRequest.noiDen == '' ||
      this.addFlightRequest.ngayXuatPhat == '' ||
      this.addFlightRequest.soLuongVeBsn == '' ||
      this.addFlightRequest.soLuongVeEco == '' ||
      this.addFlightRequest.donGia == ''||
      (this.flightTime_Hour == '00' && this.flightTime_Minute == '00' && this.flightTime_Second == '00')
    ){
      // 
      Swal.fire({
        icon: 'error',
        title: 'Thông tin không hợp lệ!',
        text: 'Vui lòng nhập đầy đủ thông tin của chuyến bay và đảm bảo thông tin hợp lệ!',
        // footer: '<a href="">Tạo sao tôi lại gặp lỗi này?</a>'
      })
    }
    else {
      this.addFlightRequest.gioBay = this.flightTime_Hour.toString().padStart(2, '0') +":"+ this.flightTime_Minute.toString().padStart(2, '0') +":"+ this.flightTime_Second.toString().padStart(2, '0');
      this.addFlightRequest.donGia = this.addFlightRequest.donGia.replace(/,/g, '');

      console.log(this.addFlightRequest.ngayXuatPhat);
      let tmpDepartureLocation
      let tmpArrivalLocation
      switch (this.addFlightRequest.noiXuatPhat) {
        case "VIETNAM":
          tmpDepartureLocation = "VN"
          break;
        case "THAILAND":
          tmpDepartureLocation = "TH"
          break;
        case "ENGLAND":
          tmpDepartureLocation = "EN"
          break;
        case "FRANCE":
          tmpDepartureLocation = "FR"
          break;
        case "JAPAN":
          tmpDepartureLocation = "JP"
          break;
        case "AMERICA":
          tmpDepartureLocation = "US"
          break;
        case "CHINA":
          tmpDepartureLocation = "CN"
          break;
        case "SINGAPORE":
          tmpDepartureLocation = "SG"
          break;
        case "HONGKONG":
          tmpDepartureLocation = "HK"
          break;
        default:
          break;
      }
      switch (this.addFlightRequest.noiDen) {
        case "VIETNAM":
          tmpArrivalLocation = "VN"
          break;
        case "THAILAND":
          tmpArrivalLocation = "TH"
          break;
        case "ENGLAND":
          tmpArrivalLocation = "EN"
          break;
        case "FRANCE":
          tmpArrivalLocation = "FR"
          break;
        case "JAPAN":
          tmpArrivalLocation = "JP"
          break;
        case "AMERICA":
          tmpArrivalLocation = "US"
          break;
        case "CHINA":
          tmpArrivalLocation = "CN"
          break;
        case "SINGAPORE":
          tmpArrivalLocation = "SG"
          break;
        case "HONGKONG":
          tmpArrivalLocation = "HK"
          break;
        default:
          break;
      }
      this.addFlightRequest.maChuyenBay = this.addFlightRequest.ngayXuatPhat.split('-')[2] + this.addFlightRequest.ngayXuatPhat.split('-')[1] + this.addFlightRequest.ngayXuatPhat.split('-')[0].slice(2) + tmpDepartureLocation + "TO" + tmpArrivalLocation + "-" + this.addFlightRequest.maMayBay
      
      // this.addFlightRequest.maChuyenBay =  + this.addFlightRequest.noiXuatPhat + "TO" + this.addFlightRequest.noiDen + this.addFlightRequest.maMayBay
      
      console.log(this.addFlightRequest)
      Swal.fire({
        title: 'Thêm thông tin chuyến bay này?',
        text: "Bạn có muốn thực hiện việc thêm thông tin chuyến bay này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Thêm chuyến bay',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          this.flightService.addFlight(this.addFlightRequest).subscribe(
            () => {
              console.log('Deleted successfully');
              Swal.fire(
                'Đã thêm thông tin chuyến bay!',
                'Thêm thông tin chuyến bay thành công.',
                'success'
              ).then(() => {
                this.router.navigate(['/admin-flight-management']);
              })
            },
            (error) => {
              Swal.fire(
                'Thêm chuyến bay không thành công!',
                'Đã xảy ra lỗi khi thực hiện việc thông tin chuyến bay này.',
                'error'
              );
            }
          );
          
        }
      })





    }
    
    // console.log(this.)
  }

}
