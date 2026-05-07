const express = require('express');
const router = express.Router();
const PhieuYeuCau_BUS = require('../services/PhieuYeuCau_BUS');
const TimKiemPhong_BUS = require('../services/TimKiemPhong_BUS');
const LichHen_DAO = require('../dao/LichHen_DAO');

// POST /api/phieu-yeu-cau/dang-ky
router.post('/dang-ky', async (req, res, next) => {
  try {
    const data = req.body;
    console.log('=== Route /dang-ky nhận request ===');
    console.log('Payload keys:', Object.keys(data));
    console.log('ChiTiet:', data.ChiTiet);
    
    // Basic validation
    if (!data.HoTen || !data.SoDienThoai || !data.CCCD || !data.DiaChi) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đủ họ tên, số điện thoại, CCCD và địa chỉ'
      });
    }

    const result = await PhieuYeuCau_BUS.taoPhieuYeuCau(data);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/phieu-yeu-cau/tim-kiem-phong?hinhThucThue=...&soNguoi=...&mucGia=...&chiNhanh=...&gioiTinh=...
router.get('/tim-kiem-phong', async (req, res, next) => {
  try {
    const { hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh } = req.query;

    if (!hinhThucThue) {
      return res.status(400).json({ success: false, message: 'Thiếu hình thức thuê' });
    }

    const result = await TimKiemPhong_BUS.timKiemPhong({ hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/phieu-yeu-cau/danh-sach?trangthai=...&keyword=...
router.get('/danh-sach', async (req, res, next) => {
  try {
    const supabase = require('../config/supabase');
    const { trangthai, keyword } = req.query;

    let query = supabase
      .from('phieu_yeu_cau_xem_phong')
      .select(`
        mayc, soluongdukien, loaiphong, mucgia,
        thoigiandukienvao, thoihanthue, thoigianhenxem,
        gioitinh, ngayguiyeucau, trangthai, loaihinhthue,
        manv, makh,
        khach_hang (makh, hoten, sdt, email, gioitinh, socccd)
      `)
      .order('ngayguiyeucau', { ascending: false });

    if (trangthai) {
      query = query.eq('trangthai', trangthai);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ success: false, error });

    let result = data || [];
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(p =>
        p.mayc?.toLowerCase().includes(kw) ||
        p.khach_hang?.hoten?.toLowerCase().includes(kw) ||
        p.khach_hang?.sdt?.includes(kw)
      );
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});


// PATCH /api/phieu-yeu-cau/cap-nhat-lich-hen - Cập nhật thoigianhenxem cho phiếu
router.patch('/cap-nhat-lich-hen', async (req, res, next) => {
  try {
    const { mayc, thoigianhenxem } = req.body;
    console.log('=== PATCH /cap-nhat-lich-hen ===');
    console.log('Payload nhận:', { mayc, thoigianhenxem });
    if (!mayc || !thoigianhenxem) {
      return res.status(400).json({ success: false, message: 'Thiếu mayc hoặc thoigianhenxem' });
    }
    const supabase = require('../config/supabase');
    const { data, error } = await supabase
      .from('phieu_yeu_cau_xem_phong')
      .update({ thoigianhenxem })
      .eq('mayc', mayc)
      .select()
      .single();

    if (error) {
      console.error('Lỗi DB cap-nhat-lich-hen:', error);
      return res.status(500).json({ success: false, error });
    }
    console.log('✓ cap-nhat-lich-hen thành công:', data?.mayc, data?.thoigianhenxem);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// GET /api/phieu-yeu-cau/chi-tiet/:mayc
router.get('/chi-tiet/:mayc', async (req, res, next) => {
  try {
    const { mayc } = req.params;
    const supabase = require('../config/supabase');
    
    // Lấy thông tin phiếu và khách hàng
    const { data: phieuData, error: phieuError } = await supabase
      .from('phieu_yeu_cau_xem_phong')
      .select(`
        *,
        khach_hang (*)
      `)
      .eq('mayc', mayc)
      .single();

    if (phieuError) {
      return res.status(500).json({ success: false, error: phieuError });
    }

    // Lấy chi tiết các phòng/giường khách chọn
    // JOIN qua giuong → phong vì chi_tiet_phieu_yeu_cau có FK tới giuong, không trực tiếp tới phong
    const { data: chiTietData, error: chiTietError } = await supabase
      .from('chi_tiet_phieu_yeu_cau')
      .select(`
        mayc,
        magiuong,
        maphong,
        trangthaichot,
        giuong (
          *,
          phong (*)
        )
      `)
      .eq('mayc', mayc);

    if (chiTietError) {
      console.error('Lỗi lấy chi tiết phiếu:', chiTietError);
      // Tiếp tục trả về phiếu dù không có chi tiết
    }

    res.json({ 
      success: true, 
      data: {
        ...phieuData,
        chi_tiet: chiTietData || []
      } 
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/phieu-yeu-cau/gio-boi?manv=NV02&ngay=2025-05-06
router.get('/gio-boi', async (req, res, next) => {
  try {
    const { manv, ngay } = req.query;
    if (!manv || !ngay) {
      return res.status(400).json({ success: false, message: 'Thiếu manv hoặc ngay' });
    }
    const result = await LichHen_DAO.layGioBoiTheoNgay(manv, ngay);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/phieu-yeu-cau/update-trang-thai-chot - Cập nhật trangthaichot = 'Chốt'
router.patch('/update-trang-thai-chot', async (req, res, next) => {
  try {
    const { mayc, maphong, magiuong, trangthaichot } = req.body;
    if (!mayc || !maphong || magiuong === undefined || !trangthaichot) {
      return res.status(400).json({ 
        success: false, 
        message: 'Thiếu mayc, maphong, magiuong hoặc trangthaichot' 
      });
    }

    const supabase = require('../config/supabase');
    const { data, error } = await supabase
      .from('chi_tiet_phieu_yeu_cau')
      .update({ trangthaichot })
      .eq('mayc', mayc)
      .eq('maphong', maphong)
      .eq('magiuong', magiuong)
      .select();

    if (error) {
      console.error('Lỗi update trangthaichot:', error);
      return res.status(500).json({ success: false, error });
    }

    console.log('✓ Update trangthaichot thành công');
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/phieu-yeu-cau/chi-tiet/:mayc/:maphong/:magiuong - Xóa chi tiết phiếu
router.delete('/chi-tiet/:mayc/:maphong/:magiuong', async (req, res, next) => {
  try {
    const { mayc, maphong, magiuong } = req.params;
    const supabase = require('../config/supabase');
    
    const { data, error } = await supabase
      .from('chi_tiet_phieu_yeu_cau')
      .delete()
      .eq('mayc', mayc)
      .eq('maphong', maphong)
      .eq('magiuong', magiuong)
      .select();

    if (error) {
      console.error('Lỗi xóa chi tiết phiếu:', error);
      return res.status(500).json({ success: false, error });
    }

    console.log('✓ Xóa chi tiết phiếu thành công');
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/phieu-yeu-cau/huy-lich/:mayc - Xóa toàn bộ lịch hẹn và chi tiết
router.delete('/huy-lich/:mayc', async (req, res, next) => {
  try {
    const { mayc } = req.params;
    console.log('=== DELETE /huy-lich/:mayc ===');
    console.log('Param mayc:', mayc);
    if (!mayc) {
      return res.status(400).json({ success: false, message: 'Thiếu mayc' });
    }

    const supabase = require('../config/supabase');

    const { error: chiTietError } = await supabase
      .from('chi_tiet_phieu_yeu_cau')
      .delete()
      .eq('mayc', mayc);

    if (chiTietError) {
      console.error('Lỗi xóa chi tiết khi hủy lịch:', chiTietError);
      return res.status(500).json({ success: false, error: chiTietError });
    }
    console.log('✓ Đã xóa chi tiết phiếu cho mayc:', mayc);

    const { data, error } = await supabase
      .from('phieu_yeu_cau_xem_phong')
      .delete()
      .eq('mayc', mayc)
      .select();

    if (error) {
      console.error('Lỗi xóa phiếu khi hủy lịch:', error);
      return res.status(500).json({ success: false, error });
    }

    console.log('✓ Hủy lịch thành công:', mayc, 'Số bản ghi phiếu đã xóa:', data?.length || 0);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/phieu-yeu-cau/update-trang-thai - Cập nhật trạng thái phiếu
router.patch('/update-trang-thai', async (req, res, next) => {
  try {
    const { mayc, trangthai } = req.body;
    if (!mayc || !trangthai) {
      return res.status(400).json({ 
        success: false, 
        message: 'Thiếu mayc hoặc trangthai' 
      });
    }

    const supabase = require('../config/supabase');
    const { data, error } = await supabase
      .from('phieu_yeu_cau_xem_phong')
      .update({ trangthai })
      .eq('mayc', mayc)
      .select();

    if (error) {
      console.error('Lỗi update trangthai phiếu:', error);
      return res.status(500).json({ success: false, error });
    }

    console.log('✓ Update trangthai phiếu thành công:', trangthai);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
