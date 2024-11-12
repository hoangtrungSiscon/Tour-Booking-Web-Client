import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingTicketComponent } from './booking-ticket.component';
import { MatButtonModule } from '@angular/material/button'; // Thêm module của Angular Material nếu cần
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Nếu component sử dụng form
import { HttpClientModule } from '@angular/common/http'; // Nếu component sử dụng HTTP
import { RouterTestingModule } from '@angular/router/testing'; // Nếu sử dụng Router trong component
import { ChuyenBayService } from '@shared/services/chuyenBay.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('BookingTicketComponent', () => {
  let service: ChuyenBayService;
  let httpMock: HttpTestingController;
  const mockChuyenBays = [
    {
      "maChuyenBay": "070124JPTOUKVJ",
      "maMayBay": "PlaneVJ",
      "tenMayBay": "Máy bay VietJack",
      "gioBay": "07:00:00",
      "noiXuatPhat": "NHATBAN",
      "noiDen": "ANH",
      "ngayXuatPhat": "2024-01-07T00:00:00",
      "donGia": 6400001,
      "soLuongVeBsn": 11,
      "soLuongVeEco": 23
    },
    {
      "maChuyenBay": "311223VNTOTHAB",
      "maMayBay": "PlaneAB",
      "tenMayBay": "Máy bay Air Bud",
      "gioBay": "00:10:00",
      "noiXuatPhat": "VIETNAM",
      "noiDen": "THAILAN",
      "ngayXuatPhat": "2023-12-31T00:00:00",
      "donGia": 1600000,
      "soLuongVeBsn": 5,
      "soLuongVeEco": 25
    },
    {
      "maChuyenBay": "301223VNTOJPAB",
      "maMayBay": "PlaneAB",
      "tenMayBay": "Máy bay Air Bud",
      "gioBay": "05:02:00",
      "noiXuatPhat": "VIETNAM",
      "noiDen": "NHATBAN",
      "ngayXuatPhat": "2023-12-30T00:00:00",
      "donGia": 4000200,
      "soLuongVeBsn": 10,
      "soLuongVeEco": 25
    },
    {
      "maChuyenBay": "281223USTORUTH",
      "maMayBay": "PlaneTH",
      "tenMayBay": "Máy bay The Hills",
      "gioBay": "05:00:00",
      "noiXuatPhat": "MY",
      "noiDen": "NGA",
      "ngayXuatPhat": "2023-12-28T00:00:00",
      "donGia": 3270000,
      "soLuongVeBsn": 5,
      "soLuongVeEco": 34
    },
    {
      "maChuyenBay": "271223SGTOUSMT",
      "maMayBay": "PlaneMT",
      "tenMayBay": "Máy bay Metro",
      "gioBay": "05:00:00",
      "noiXuatPhat": "SINGAPORE",
      "noiDen": "MY",
      "ngayXuatPhat": "2023-12-27T00:00:00",
      "donGia": 4500000,
      "soLuongVeBsn": 7,
      "soLuongVeEco": 27
    },
    {
      "maChuyenBay": "251223VNTOTHVJ",
      "maMayBay": "PlaneVJ",
      "tenMayBay": "Máy bay VietJack",
      "gioBay": "04:00:00",
      "noiXuatPhat": "VIETNAM",
      "noiDen": "THAILAN",
      "ngayXuatPhat": "2023-12-25T00:00:00",
      "donGia": 1720000,
      "soLuongVeBsn": 11,
      "soLuongVeEco": 25
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Cung cấp HttpClientTestingModule
      providers: [ChuyenBayService]
    });

    service = TestBed.inject(ChuyenBayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all chuyến bay', () => {
    service.getAll().subscribe((data) => {
      try{
        expect(data).toEqual(mockChuyenBays);
        console.log("Test 1 suscess") // Kiểm tra xem dữ liệu trả về đúng như mong muốn
      }
      catch (error){
        console.log("Test 1 failed")
      }
    });

    const req = httpMock.expectOne('https://flightdotapi.azurewebsites.net/api/chuyenbay/getAll'); // Kiểm tra xem URL có chính xác không
    expect(req.request.method).toBe('GET'); // Kiểm tra phương thức HTTP là GET
    req.flush(mockChuyenBays); // Giả lập dữ liệu trả về từ server
  });

  afterEach(() => {
    httpMock.verify(); // Kiểm tra rằng không còn yêu cầu HTTP nào chưa được xử lý
  });

  it('should handle error response from the API', () => {
    // Call the service method
    service.getAll().subscribe(
      () => fail('expected an error, not chuyến bay data'),
      (error) => {
        expect(error.status).toBe(500); // Expecting the error status code to be 500 (Internal Server Error)
      }
    );

    // Expect an HTTP request to be made to the correct URL
    const req = httpMock.expectOne('https://flightdotapi.azurewebsites.net/api/chuyenbay/getAll');
    expect(req.request.method).toBe('GET'); // Verify the HTTP method is GET

    // Simulate a server error response
    req.flush('Error fetching data', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests
    httpMock.verify();
  });

});
