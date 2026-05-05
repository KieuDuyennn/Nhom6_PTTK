import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DangNhap from './pages/DangNhap';
import DanhSachPYCXemPhong from './pages/DanhSachPYCXemPhong';
import ChiTietPYCXemPhong from './pages/ChiTietPYCXemPhong';
import GhiNhanXacNhanThue from './pages/GhiNhanXacNhanThue';
import DanhSachHopDongChoLapYCTT from './pages/DanhSachHopDongChoLapYCTT';
import ChiTietYeuCauThanhToan from './pages/ChiTietYeuCauThanhToan';
import ThanhToanThanhCong_YCTT from './pages/ThanhToanThanhCong_YCTT';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} />
        <Route path="/phieu-yeu-cau" element={<DanhSachPYCXemPhong />} />
        <Route path="/phieu-yeu-cau/:id" element={<ChiTietPYCXemPhong />} />
        <Route path="/ghi-nhan-xac-nhan-thue/:id" element={<GhiNhanXacNhanThue />} />
        <Route path="/danh-sach-hop-dong-yctt" element={<DanhSachHopDongChoLapYCTT />} />
        <Route path="/chi-tiet-yctt/:maTT" element={<ChiTietYeuCauThanhToan />} />
        <Route path="/thanh-toan-thanh-cong-yctt/:maTT" element={<ThanhToanThanhCong_YCTT />} />
      </Routes>
    </Router>
  );
}

export default App;