const express = require('express');
const router = express.Router();
const chiNhanhService = require('../services/chiNhanh.service');

// GET /api/chi-nhanh — Lấy danh sách tất cả chi nhánh (dùng cho dropdown UI)
router.get('/', async (req, res, next) => {
  try {
    const result = await chiNhanhService.layDanhSachChiNhanh();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
