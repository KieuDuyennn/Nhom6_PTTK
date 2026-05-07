const KhachHang_DAO = require('../dao/KhachHang_DAO');
const PhieuYeuCau_DAO = require('../dao/PhieuYeuCau_DAO');
const ChiTietPhieuYeuCau_DAO = require('../dao/ChiTietPhieuYeuCau_DAO');

class PhieuYeuCau_BUS {
  static async taoPhieuYeuCau(data) {
    try {
      // 1. Kiểm tra Khách hàng đã tồn tại qua CCCD chưa
      let maKH;
      const khExist = await KhachHang_DAO.findByCCCD(data.CCCD);
      if (khExist.success && khExist.data) {
        maKH = khExist.data.makh;
      } else {
        maKH = `KH${Date.now().toString().slice(-6)}`; // Auto generate KH id
        const khachHangData = {
          makh: maKH,
          hoten: data.HoTen,
          sdt: data.SoDienThoai,
          diachicutru: data.DiaChi,
          email: data.Email,
          gioitinh: data.GioiTinh,
          ngaysinh: data.NgaySinh || null,
          socccd: data.CCCD,
          loaikhachhang: 'Cá nhân',
          trangthai: 'Chờ kiểm tra'  // Constraint: 'Hợp lệ' | 'Chờ kiểm tra'
        };

        const khResult = await KhachHang_DAO.insert(khachHangData);
        if (!khResult.success) {
          return { success: false, message: 'Không thể tạo thông tin khách hàng', error: khResult.error };
        }
      }

      // 2. Tạo Phiếu yêu cầu
      const maYC = `YC${Date.now().toString().slice(-6)}`;
      // Map hình thức thuê của frontend (Cá nhân, Ở ghép, Thuê nguyên căn) 
      // sang check constraint của DB (Ở ghép, Nguyên phòng)
      const hinhThucDb = (data.HinhThucThue === 'Thuê nguyên căn') ? 'Nguyên phòng' : 'Ở ghép';

      const phieuYeuCauData = {
        mayc: maYC,
        soluongdukien: parseInt(data.SoNguoiMuonThue) || 1,
        loaiphong: hinhThucDb,
        mucgia: parseFloat(data.MucGia) || 0,
        thoigiandukienvao: data.NgayDuKienDonVao || null,
        thoihanthue: parseInt(data.ThoiHanThue) || 6,
        yeucaukhac: data.YeuCauKhac || null,
        gioitinh: data.GioiTinh || null,           // Lưu giới tính từ form
        thoigianhenxem: data.ThoiGianHenXem || null, // Lưu lịch hẹn khi đặt
        trangthai: 'Đang hẹn xem',  // Mới tạo: chờ đặt lịch xem phòng
        loaihinhthue: hinhThucDb,
        makh: maKH,
        manv: data.MaNV || null,                   // Lấy từ nhân viên đang đăng nhập
      };

      const pycResult = await PhieuYeuCau_DAO.insert(phieuYeuCauData);
      if (!pycResult.success) {
        return { success: false, message: 'Không thể tạo phiếu yêu cầu', error: pycResult.error };
      }

      // Nếu frontend gửi chi tiết phòng/giường (data.ChiTiet), lưu vào bảng chi_tiet_phieu_yeu_cau
      try {
        const insertedPYC = pycResult.data; // full inserted row
        const maycSaved = insertedPYC.mayc || maYC;
        console.log('=== BUS.taoPhieuYeuCau check ChiTiet ===');
        console.log('data.ChiTiet:', data.ChiTiet);
        console.log('Is array:', Array.isArray(data.ChiTiet));
        console.log('Length:', data.ChiTiet?.length);
        
        if (Array.isArray(data.ChiTiet) && data.ChiTiet.length > 0) {
          const supabase = require('../config/supabase');
          const records = [];
          console.log('Bắt đầu xử lý ChiTiet items...');

          // Process each room/bed selection
          for (const item of data.ChiTiet) {
            const maphong = item.maphong || null;
            const macn = item.macn || null;
            const magiuong = item.magiuong || null;
            console.log(`  Item: maphong=${maphong}, macn=${macn}, magiuong=${magiuong}`);

            if (!maphong) {
              console.log('  → Bỏ qua: không có maphong');
              continue; // Skip if no room
            }

            if (magiuong) {
              // Cá nhân hoặc ở ghép: có bed cụ thể
              records.push({
                mayc: maycSaved,
                maphong,
                magiuong,
                trangthaichot: 'Không chốt'
              });
            } else {
              // Thuê nguyên căn: magiuong = null → fetch all beds in this room
              const { data: allBeds, error: bedsError } = await supabase
                .from('giuong')
                .select('magiuong, maphong')
                .eq('maphong', maphong);

              if (bedsError) {
                console.error(`Lỗi lấy danh sách giường cho phòng ${maphong}:`, bedsError);
                continue;
              }

              if (Array.isArray(allBeds) && allBeds.length > 0) {
                allBeds.forEach(bed => {
                  records.push({
                    mayc: maycSaved,
                    maphong: bed.maphong,
                    magiuong: bed.magiuong,
                    trangthaichot: 'Không chốt'
                  });
                });
              }
            }
          }

          // Insert all records
          console.log(`Tổng records cần insert: ${records.length}`);
          console.log('Records:', records);
          if (records.length > 0) {
            const ctResult = await ChiTietPhieuYeuCau_DAO.insertMany(records);
            console.log('ChiTietPhieuYeuCau_DAO.insertMany result:', ctResult);
            if (!ctResult.success) {
              console.error('Không thể lưu chi tiết phiếu yêu cầu:', ctResult.error);
              return { success: true, message: 'Tạo phiếu yêu cầu thành công (chi tiết chưa lưu)', data: { MaYC: maycSaved, MaKH: maKH }, warning: ctResult.error };
            }
          } else {
            console.log('Không có records cần insert');
          }
        }

      } catch (err) {
        console.error('Lỗi khi lưu chi tiết phiếu:', err);
      }

      return { 
        success: true, 
        message: 'Tạo phiếu yêu cầu thành công',
        data: { MaYC: maYC, MaKH: maKH }
      };

    } catch (error) {
      console.error("Lỗi tại PhieuYeuCau_BUS.taoPhieuYeuCau:", error);
      return { success: false, message: 'Lỗi server khi tạo phiếu yêu cầu' };
    }
  }
}

module.exports = PhieuYeuCau_BUS;
