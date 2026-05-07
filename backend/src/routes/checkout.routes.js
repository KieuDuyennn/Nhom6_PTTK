const express = require('express');
const router = express.Router();
const HopDong_BUS = require('../services/hopDong.service');
const BienBanTraPhong_BUS = require('../services/bienBanTraPhong.service');
const BangDoiSoat_BUS = require('../services/bangDoiSoat.service');
const BienBanBanGiao_BUS = require('../services/bienBanBanGiao.service');
const BaoCao_BUS = require('../services/baoCaoTinhTrangPhong.service');

// Contract routes - Direct BUS mapping
router.get('/contracts', async (req, res, next) => {
  try {
    const { status } = req.query;
    const contracts = await HopDong_BUS.LayTheoTrangThai(status || 'Đã đối soát');
    res.json(contracts);
  } catch (error) {
    next(error);
  }
});

router.get('/contracts/search', async (req, res, next) => {
  try {
    const { keyword, status } = req.query;
    const contracts = await HopDong_BUS.TimKiem(status || 'Đã đối soát', keyword);
    res.json(contracts);
  } catch (error) {
    next(error);
  }
});

router.get('/contracts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await HopDong_BUS.LayTheoMa(id);
    res.json(contract);
  } catch (error) {
    next(error);
  }
});

// Checkout report routes - Direct BUS mapping
router.post('/reports', async (req, res, next) => {
  try {
    const { maHD, maNV } = req.body;
    const report = await BienBanTraPhong_BUS.Tao(maHD, maNV);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
});

router.get('/reports/creation-data', async (req, res, next) => {
  try {
    const { maHD } = req.query;
    
    const [reconciliation, handover, roomReport] = await Promise.all([
      BangDoiSoat_BUS.LayTheoMaHD(maHD),
      BienBanBanGiao_BUS.LayTaiSanTheoHopDong(maHD),
      BaoCao_BUS.LayTheoHopDong(maHD)
    ]);

    res.json({
      reconciliation,
      handover,
      roomReport
    });
  } catch (error) {
    next(error);
  }
});

router.get('/reports/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await BienBanTraPhong_BUS.LayTheoMa(id);
    res.json(report);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
