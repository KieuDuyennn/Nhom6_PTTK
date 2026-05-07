import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DangNhap from './pages/DangNhap';
import DanhSachPYCXemPhong from './pages/DanhSachPYCXemPhong';
import ChiTietPYCXemPhong from './pages/ChiTietPYCXemPhong';
import GhiNhanXacNhanThue from './pages/GhiNhanXacNhanThue';
import DangKyThuePhong from './pages/DangKyThuePhong';
import KetQuaTimKiemPhong from './pages/KetQuaTimKiemPhong';
import DanhSachPhongChon from './pages/DanhSachPhongChon';
import DatLichHen from './pages/DatLichHen';
import DanhSachLichHen from './pages/DanhSachLichHen';
import ChiTietLichHen from './pages/ChiTietLichHen';
import MHDanhSachHopDong from './pages/MHDanhSachHopDong';
import MHTaoBienBanTraPhong from './pages/MHTaoBienBanTraPhong';
import MHXemTruocIn from './pages/MHXemTruocIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} />
        <Route path="/dang-ky-thue-phong" element={<DangKyThuePhong />} />
        <Route path="/ket-qua-tim-kiem" element={<KetQuaTimKiemPhong />} />
        <Route path="/danh-sach-phong-chon" element={<DanhSachPhongChon />} />
        <Route path="/dat-lich-hen" element={<DatLichHen />} />
        <Route path="/lich-hen" element={<DanhSachLichHen />} />
        <Route path="/lich-hen/:id" element={<ChiTietLichHen />} />
        <Route path="/phieu-yeu-cau" element={<DanhSachPYCXemPhong />} />
        <Route path="/phieu-yeu-cau/:id" element={<ChiTietPYCXemPhong />} />
        <Route path="/ghi-nhan-xac-nhan-thue/:id" element={<GhiNhanXacNhanThue />} />
        <Route path="/danh-sach-hop-dong" element={<MHDanhSachHopDong />} />
        <Route path="/tao-bien-ban-tra-phong/:id" element={<MHTaoBienBanTraPhong />} />
        <Route path="/xem-truoc-in/:id" element={<MHXemTruocIn />} />
      </Routes>
    </Router>
  );
}

export default App;