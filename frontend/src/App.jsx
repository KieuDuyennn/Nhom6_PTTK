import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DangNhap from './pages/DangNhap';
import DanhSachPYCXemPhong from './pages/DanhSachPYCXemPhong';
import ChiTietPYCXemPhong from './pages/ChiTietPYCXemPhong';
import GhiNhanXacNhanThue from './pages/GhiNhanXacNhanThue';
import MHDanhSachHopDong from './pages/MHDanhSachHopDong';
import MHTaoBienBanTraPhong from './pages/MHTaoBienBanTraPhong';
import MHXemTruocIn from './pages/MHXemTruocIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} />
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