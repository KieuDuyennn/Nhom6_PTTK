const express = require('express');
const router = express.Router();
const ThanhToan_BUS = require('../services/thanhToan.service');
const HopDong_BUS = require('../services/hopDong.service');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

// GET /api/thanh-toan/thong-tin-ky-dau/:maHD
router.get('/thong-tin-ky-dau/:maHD', async (req, res, next) => {
  try {
    const data = await HopDong_BUS.LayThongTinThanhToanKyDau(req.params.maHD);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/thanh-toan/sinh-ma
router.get('/sinh-ma', async (req, res, next) => {
  try {
    const maTT = await ThanhToan_BUS.TaoMa();
    res.json({ maTT });
  } catch (err) {
    next(err);
  }
});

// POST /api/thanh-toan/ky-dau
router.post('/ky-dau', async (req, res, next) => {
  try {
    const { maHD, maNV, maTT } = req.body;
    const result = await ThanhToan_BUS.TaoPhieuThanhToanKyDau(maHD, maNV, maTT);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
