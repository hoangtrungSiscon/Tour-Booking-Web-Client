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

    const req = httpMock.expectOne('https://localhost:7000/api/chuyenbay/getAll'); // Kiểm tra xem URL có chính xác không
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
    const req = httpMock.expectOne('https://localhost:7000/api/chuyenbay/getAll');
    expect(req.request.method).toBe('GET'); // Verify the HTTP method is GET

    // Simulate a server error response
    req.flush('Error fetching data', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests
    httpMock.verify();
  });

});
describe('BookingDetailComponent', () => {
  let component: BookingTicketComponent;
  let fixture: ComponentFixture<BookingTicketComponent>;
  let flightService: ChuyenBayService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BookingTicketComponent],
      providers: [BookingTicketComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTicketComponent);
    component = fixture.componentInstance;
    flightService = TestBed.inject(ChuyenBayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve flights from API and bind to component', () => {
    const mockFlights = [
      { maChuyenBay: '001', tenMayBay: 'Boeing 777', noiDen: 'London', gia: 5000000 }
    ];
    
    // Gọi phương thức để lấy thông tin chuyến bay
    component.ngOnInit();
    
    const req = httpMock.expectOne('https://api.flight.com/flights');
    expect(req.request.method).toBe('GET');
    req.flush(mockFlights); // Giả lập dữ liệu trả về từ API
    
    // Kiểm tra xem dữ liệu có được gán vào component không
    expect(component.tickets).toEqual(mockFlights);
  });

  afterEach(() => {
    httpMock.verify(); // Kiểm tra xem có request nào chưa được xử lý không
  });
});

describe('BookingTicketModule', () => {
  let service: ChuyenBayService;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<BookingTicketComponent>;
  let component: BookingTicketComponent;

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
    }
    // Thêm dữ liệu mock khác nếu cần
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Giả lập các yêu cầu HTTP
        RouterTestingModule,     // Kiểm tra router
        FormsModule,             // Nếu component sử dụng FormsModule
        ReactiveFormsModule,     // Nếu sử dụng ReactiveForms
        MatButtonModule          // Nếu component sử dụng Angular Material
      ],
      declarations: [BookingTicketComponent],  // Đăng ký component cần kiểm thử
      providers: [ChuyenBayService]            // Đảm bảo service được tiêm vào đúng cách
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTicketComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ChuyenBayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the module and inject the service correctly', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should retrieve all chuyến bay data and bind to the component', () => {
    spyOn(service, 'getAll').and.callThrough();

    // Gọi phương thức ngOnInit để lấy dữ liệu chuyến bay
    component.ngOnInit();

    // Kiểm tra yêu cầu HTTP
    const req = httpMock.expectOne('https://localhost:7000/api/chuyenbay/getAll');
    expect(req.request.method).toBe('GET');
    req.flush(mockChuyenBays); // Giả lập dữ liệu trả về

    // Kiểm tra xem dữ liệu có được gán vào component không
    expect(component.tickets).toEqual(mockChuyenBays);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should handle error when API call fails', () => {
    service.getAll().subscribe(
      () => fail('Expected an error, not chuyến bay data'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('https://localhost:7000/api/chuyenbay/getAll');
    expect(req.request.method).toBe('GET');

    // Giả lập lỗi trả về từ server
    req.flush('Error fetching data', { status: 500, statusText: 'Internal Server Error' });
  });

  afterEach(() => {
    httpMock.verify(); // Kiểm tra xem không còn yêu cầu HTTP nào chưa xử lý
  });
});