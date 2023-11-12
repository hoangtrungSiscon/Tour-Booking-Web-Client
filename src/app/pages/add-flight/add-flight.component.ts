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
  public planeList: any[] = []
  BSN_Seats: number = 0;
  ECO_Seats: number = 0;
  constructor(private flightService: FlightApiService, private planeService: PlaneApiService, private router: Router) {

  }
  ngOnInit(): void {
    this.planeService.getPlaneList().subscribe(data => {
      this.planeList = data;
      // console.log(this.planeList)
      this.addFlightRequest.donGia = "0 đ";
      this.addFlightRequest.soLuongVeBsn = 0;
      this.addFlightRequest.soLuongVeEco = 0;
    })
    
  }

  updatePlaneInfo(event: any, id: any): void {
    const element = this.planeList.find(element => element.maMayBay == id);
    if (element) {
      this.addFlightRequest.tenMayBay = element.tenMayBay;
      this.BSN_Seats = element.slgheBsn;
      this.ECO_Seats = element.slgheEco;
    }

  }

  addFlight() {
    console.log(this.addFlightRequest)
    if (
      this.addFlightRequest.maMayBay == '' ||
      this.addFlightRequest.tenMayBay == '' ||
      this.addFlightRequest.noiXuatPhat == '' ||
      this.addFlightRequest.noiDen == '' ||
      this.addFlightRequest.ngayXuatPhat == '' ||
      this.addFlightRequest.donGia == ''||
      (this.flightTime_Hour == '00' && this.flightTime_Minute == '00')
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Thông tin không hợp lệ!',
        text: 'Vui lòng nhập đầy đủ thông tin của chuyến bay và đảm bảo thông tin hợp lệ!',
      })
    }
    else {
      this.addFlightRequest.gioBay = this.flightTime_Hour.toString().padStart(2, '0') + ":" + this.flightTime_Minute.toString().padStart(2, '0') + ":" + "00";
      this.addFlightRequest.donGia = this.addFlightRequest.donGia.replace(/,/g, '').replace(/ đ/g, '');
      console.log(this.addFlightRequest.donGia)
      let tmpDepartureLocation
      let tmpArrivalLocation
      switch (this.addFlightRequest.noiXuatPhat) {
        case "VIETNAM":
          tmpDepartureLocation = "VN"
          break;
        case "THAILAN":
          tmpDepartureLocation = "TH"
          break;
        case "ANH":
          tmpDepartureLocation = "UK"
          break;
        case "PHAP":
          tmpDepartureLocation = "FR"
          break;
        case "NHATBAN":
          tmpDepartureLocation = "JP"
          break;
        case "MY":
          tmpDepartureLocation = "US"
          break;
        case "NGA":
          tmpDepartureLocation = "RU"
          break;
        case "SINGAPORE":
          tmpDepartureLocation = "SG"
          break;
        case "HONGKONG":
          tmpDepartureLocation = "HK"
          break;
        case "HANQUOC":
          tmpDepartureLocation = "KR"
          break;
        default:
          break;
      }
      switch (this.addFlightRequest.noiDen) {
        case "VIETNAM":
          tmpArrivalLocation = "VN"
          break;
        case "THAILAN":
          tmpArrivalLocation = "TH"
          break;
        case "ANH":
          tmpArrivalLocation = "UK"
          break;
        case "PHAP":
          tmpArrivalLocation = "FR"
          break;
        case "NHATBAN":
          tmpArrivalLocation = "JP"
          break;
        case "MY":
          tmpArrivalLocation = "US"
          break;
        case "NGA":
          tmpArrivalLocation = "RU"
          break;
        case "SINGAPORE":
          tmpArrivalLocation = "SG"
          break;
        case "HONGKONG":
          tmpArrivalLocation = "HK"
          break;
        case "HANQUOC":
          tmpArrivalLocation = "KR"
          break;
        default:
          break;
      }
      this.addFlightRequest.maChuyenBay = this.addFlightRequest.ngayXuatPhat.split('-')[2] + this.addFlightRequest.ngayXuatPhat.split('-')[1] + this.addFlightRequest.ngayXuatPhat.split('-')[0].slice(2) + tmpDepartureLocation + "TO" + tmpArrivalLocation + "-" + this.addFlightRequest.maMayBay
      // this.addFlightRequest.donGia = this.addFlightRequest.donGia.toString().
      console.log(this.addFlightRequest)
      Swal.fire({
        title: 'Thêm thông tin chuyến bay này?',
        text: "Bạn có muốn thực hiện việc thêm thông tin chuyến bay mới này không? Mã chuyến bay không thể được chỉnh sửa sau khi thông tin chuyến bay đã được tạo!",
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
              Swal.fire(
                'Đã thêm thông tin chuyến bay!',
                'Thêm thông tin chuyến bay thành công.',
                'success'
              ).then(() => {
                this.router.navigateByUrl('/admin-dashboard/admin-flight-management');
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
  }
}
