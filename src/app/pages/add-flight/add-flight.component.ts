import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { FlightDetails } from 'src/app/models/FlightDetailModel';
import { FlightApiService } from 'src/app/services/flight-api.service';
import { PlaneApiService } from 'src/app/services/plane-api.service';
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
  constructor(private flightService: FlightApiService, private planeService: PlaneApiService) {

  }
  ngOnInit(): void {
    this.planeService.getPlaneList().subscribe(data => {
      console.log(data)
      this.planeList = data;
      console.log(this.planeList)
    })
  }

  // updateTenMayBay() {
  //   const selectedPlane = this.planeList.find(plane => plane.maMayBay === this.selectedMaMayBay);
  //   if (selectedPlane) {
  //       this.selectedTenMayBay = selectedPlane.tenMayBay;
  //   }
  // }

  updatePlaneName(event: any, id: any) : void{
    const element = this.planeList.find(element => element.maMayBay == id);
    if (element) {
      this.addFlightRequest.tenMayBay = element.tenMayBay;

    }

  }

  addFlight(){
    // this.service.addFlight(this.addFlightRequest).subscribe();
    // this.addFlightRequest = {
    //   maChuyenBay: '',
    //   maMayBay: '',
    //   tenMayBay: '',
    //   noiXuatPhat: '',
    //   noiDen: '',
    //   ngayXuatPhat: '',
    //   gioBay: '',
    //   soLuongVeBsn: '',
    //   soLuongVeEco: '',
    //   donGia: '',
    // }
    // this.addFlightRequest.donGia = parseInt(this.addFlightRequest.donGia);
    // this.addFlightRequest.soLuongVeBsn = parseInt(this.addFlightRequest.soLuongVeBsn);
    if (
      // this.addFlightRequest.maChuyenBay == '' ||
      this.addFlightRequest.maMayBay == '' ||
      this.addFlightRequest.tenMayBay == '' ||
      this.addFlightRequest.noiXuatPhat == '' ||
      this.addFlightRequest.noiDen == '' ||
      this.addFlightRequest.ngayXuatPhat == '' ||
      this.addFlightRequest.gioBay == '' ||
      this.addFlightRequest.soLuongVeBsn == '' ||
      this.addFlightRequest.soLuongVeEco == '' ||
      this.addFlightRequest.donGia == ''
    ){
      // 
      Swal.fire({
        icon: 'error',
        title: 'Thêm chuyến bay không thành công!',
        text: 'Vui lòng nhập đầy đủ thông tin chuyến bay!',
        // footer: '<a href="">Tạo sao tôi lại gặp lỗi này?</a>'
      })
    }
    this.addFlightRequest.gioBay = this.flightTime_Hour.toString().padStart(2, '0') +":"+ this.flightTime_Minute.toString().padStart(2, '0') +":"+ this.flightTime_Second.toString().padStart(2, '0');
    this.addFlightRequest.donGia = this.addFlightRequest.donGia.replace(/,/g, '');
    // this.flightService.addFlight(this.addFlightRequest).subscribe();
    console.log(this.addFlightRequest);
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
              window.location.reload();
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
    // console.log(this.)
  }

}
