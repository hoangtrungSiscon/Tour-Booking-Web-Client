import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { FlightDetails } from 'src/app/shared/models/FlightDetailModel';
import { FlightApiService } from 'src/app/shared/services/flight-api.service';
import { PlaneApiService } from 'src/app/shared/services/plane-api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent {
  editFlightRequest: FlightDetails = {
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
  constructor(private flightService: FlightApiService, private planeService: PlaneApiService, private router: Router, private ActivatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.planeService.getPlaneList().subscribe(data => {
      
      this.planeList = data;
      
    })
      this.flightService.getFlightListById(this.ActivatedRoute.snapshot.paramMap.get('id') as string).subscribe(data => {  
      this.editFlightRequest = data[0];
      console.log(this.editFlightRequest)
      this.flightTime_Hour = this.editFlightRequest.gioBay.split(':')[0];
      this.flightTime_Minute = this.editFlightRequest.gioBay.split(':')[1];
      this.editFlightRequest.ngayXuatPhat = this.editFlightRequest.ngayXuatPhat.split('T')[0];
      this.editFlightRequest.donGia = this.editFlightRequest.donGia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
      console.log(this.editFlightRequest.donGia)
    })
    setTimeout(() => {
      this.BSN_Seats = this.planeList.find(element => element.maMayBay == this.editFlightRequest.maMayBay).slgheBsn;
      this.ECO_Seats = this.planeList.find(element => element.maMayBay == this.editFlightRequest.maMayBay).slgheEco;
    }, 1000);
    
  }

  updatePlaneInfo(id: any) : void{
    const element = this.planeList.find(element => element.maMayBay == id);
    if (element) {
      this.editFlightRequest.tenMayBay = element.tenMayBay;
      this.BSN_Seats = element.slgheBsn;
      this.ECO_Seats = element.slgheEco;
    }

  }

  updateFlight(){
    if (
      // this.editFlightRequest.maChuyenBay == '' ||
      this.editFlightRequest.maMayBay == '' ||
      this.editFlightRequest.tenMayBay == '' ||
      this.editFlightRequest.noiXuatPhat == '' ||
      this.editFlightRequest.noiDen == '' ||
      this.editFlightRequest.ngayXuatPhat == '' ||
      this.editFlightRequest.donGia == ''
    ){
      // 
      Swal.fire({
        icon: 'error',
        title: 'Chưa nhập đầy đủ thông tin!',
        text: 'Vui lòng nhập đầy đủ thông tin chuyến bay!',
        // footer: '<a href="">Tạo sao tôi lại gặp lỗi này?</a>'
      })
    }
    else {
      this.editFlightRequest.gioBay = this.flightTime_Hour.toString().padStart(2, '0') +":"+ this.flightTime_Minute.toString().padStart(2, '0') +":"+ "00";
      this.editFlightRequest.donGia = this.editFlightRequest.donGia.replace(/,/g, '').replace(/ đ/g, '');
      console.log(this.editFlightRequest);
      Swal.fire({
        title: 'Chỉnh sửa thông tin chuyến bay này?',
        text: "Bạn có muốn thực hiện việc chỉnh sửa thông tin chuyến bay này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chỉnh sửa chuyến bay',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          this.flightService.updateFlight(this.editFlightRequest.maChuyenBay, this.editFlightRequest).subscribe(
            () => {
              Swal.fire(
                'Chỉnh sửa thành công!',
                'Chỉnh sửa thông tin chuyến bay thành công.',
                'success'
              ).then(() => {
                this.router.navigate(['/admin-dashboard', 'admin-flight-management']);
                
              })
            },
            (error) => {
              Swal.fire(
                'Chỉnh sửa không thành công!',
                'Đã xảy ra lỗi khi thực hiện việc chỉnh sửa thông tin chuyến bay này.',
                'error'
              );
            }
          );
          
        }
      })
    }
  }
}
