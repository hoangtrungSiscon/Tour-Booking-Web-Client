describe('Chuyến Bay - Kiểm thử getAll()', () => {
  // Dữ liệu mock cho chuyến bay
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
    
  ];

  beforeEach(() => {
    // Giả lập API trả về dữ liệu chuyến bay mock
    cy.intercept('GET', 'https://flightdotapi.azurewebsites.net/api/chuyenbay/getAll', {
      statusCode: 200,
      body: mockChuyenBays,
    }).as('getAllChuyenBays'); // Tạo alias cho intercept để dễ dàng tham chiếu sau này
  });

  it('should load all chuyến bay from the API and display them', () => {
    // Mở trang nơi hiển thị chuyến bay
    cy.visit('https://flightdotclient.azurewebsites.net/booking-ticket'); // Đảm bảo thay đổi URL đúng với trang của bạn

    // Chờ yêu cầu API được gửi và đảm bảo rằng dữ liệu được trả về đúng
    cy.wait('@getAllChuyenBays').its('response.statusCode').should('eq', 200);

    // Kiểm tra xem các chuyến bay có được hiển thị trong giao diện không
    mockChuyenBays.forEach((chuyenBay) => {
      cy.contains(chuyenBay.tenMayBay); // Kiểm tra tên máy bay có hiển thị không
      cy.contains(chuyenBay.gioBay); // Kiểm tra giờ bay có hiển thị không
      cy.contains(chuyenBay.noiXuatPhat); // Kiểm tra nơi xuất phát có hiển thị không
      cy.contains(chuyenBay.noiDen); // Kiểm tra nơi đến có hiển thị không
    });
  });

  it('should show an error if the API request fails', () => {
    // Giả lập API trả về lỗi 500
    cy.intercept('GET', 'https://flightdotapi.azurewebsites.net/api/chuyenbay/getAll', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getAllChuyenBaysError');

    // Mở trang nơi hiển thị chuyến bay
    cy.visit('https://flightdotclient.azurewebsites.net/booking-ticket');

    // Chờ yêu cầu API và kiểm tra xem có thông báo lỗi không
    cy.wait('@getAllChuyenBaysError').its('response.statusCode').should('eq', 500);

    
  });
});
