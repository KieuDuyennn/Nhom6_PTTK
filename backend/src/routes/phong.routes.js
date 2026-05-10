const express = require('express');
const router = express.Router();
const phongService = require('../services/phong.service');

// GET /api/phong/tim-kiem?hinhThucThue=...&soNguoi=...&mucGia=...&chiNhanh=...&gioiTinh=...
router.get('/tim-kiem', async (req, res, next) => {
  try {
    const { hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh } = req.query;

    if (!hinhThucThue) {
      return res.status(400).json({ success: false, message: 'Thiếu hình thức thuê' });
    }

    const result = await phongService.timKiemPhong({ hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
